const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // Parse inputs
    const token = core.getInput('repo-token');
    const staleDays = parseInt(core.getInput('stale-days'), 10);
    const closeDays = parseInt(core.getInput('close-days'), 10);
    const staleLabel = core.getInput('stale-label');
    const closeLabel = core.getInput('close-label');
    const exemptLabelsRaw = core.getInput('exempt-labels');
    const dryRun = core.getInput('dry-run').toLowerCase() === 'true';

    const exemptLabels = exemptLabelsRaw.split(',').map(l => l.trim()).filter(Boolean);

    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    const staleThreshold = new Date();
    staleThreshold.setDate(staleThreshold.getDate() - staleDays);

    const closeThreshold = new Date();
    closeThreshold.setDate(closeThreshold.getDate() - (staleDays + closeDays));

    core.info(`Repository: ${owner}/${repo}`);
    core.info(`Stale after: ${staleDays} days`);
    core.info(`Close after: ${closeDays} days (total ${staleDays + closeDays} days of inactivity)`);
    core.info(`Stale label: "${staleLabel}"`);
    core.info(`Close label: "${closeLabel}"`);
    core.info(`Exempt labels: ${exemptLabels.join(', ') || '(none)'}`);
    core.info(`Dry run: ${dryRun}`);
    core.info('');

    // Fetch issues and PRs
    const allItems = await fetchAllIssues(octokit, owner, repo);
    core.info(`Found ${allItems.length} open issues/PRs total.`);

    let staleCount = 0;
    let closeCount = 0;
    let exemptCount = 0;

    for (const item of allItems) {
      const type = item.pull_request ? 'PR' : 'Issue';
      const number = item.number;
      const title = item.title;
      const updatedAt = new Date(item.updated_at);
      const labels = item.labels.map(l => l.name);

      // Check exempt labels
      const hasExempt = labels.some(l => exemptLabels.includes(l));
      if (hasExempt) {
        core.info(`[${type} #${number}] "${title}" — EXEMPT (labels: ${labels.filter(l => exemptLabels.includes(l)).join(', ')})`);
        exemptCount++;
        continue;
      }

      const alreadyStale = labels.includes(staleLabel);
      const alreadyClosedLabel = labels.includes(closeLabel);

      if (!alreadyStale && updatedAt < staleThreshold) {
        // Mark as stale
        core.info(`[${type} #${number}] "${title}" — marking stale (last updated: ${item.updated_at})`);
        if (!dryRun) {
          await octokit.rest.issues.addLabels({
            owner, repo, issue_number: number,
            labels: [staleLabel]
          });
          // Add stale comment
          await octokit.rest.issues.createComment({
            owner, repo, issue_number: number,
            body: `This ${type.toLowerCase()} has been marked as stale due to ${staleDays} days of inactivity. It will be closed in ${closeDays} days if no further activity occurs.`
          });
        }
        staleCount++;
      }

      if (alreadyStale && updatedAt < closeThreshold) {
        // Close it
        core.info(`[${type} #${number}] "${title}" — closing (last updated: ${item.updated_at})`);
        if (!dryRun) {
          await octokit.rest.issues.addLabels({
            owner, repo, issue_number: number,
            labels: [closeLabel]
          });
          await octokit.rest.issues.update({
            owner, repo, issue_number: number,
            state: 'closed',
            state_reason: 'not_planned'
          });
          await octokit.rest.issues.createComment({
            owner, repo, issue_number: number,
            body: `This ${type.toLowerCase()} has been closed due to inactivity.`
          });
        }
        closeCount++;
      }
    }

    core.info('');
    core.info('=== Summary ===');
    core.info(`Exempt from stale: ${exemptCount}`);
    core.info(`Marked stale: ${staleCount}`);
    core.info(`Closed: ${closeCount}`);
    core.info('===============');

    core.setOutput('marked-stale', staleCount);
    core.setOutput('closed', closeCount);
    core.setOutput('exempt', exemptCount);

  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

async function fetchAllIssues(octokit, owner, repo) {
  let allItems = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const { data } = await octokit.rest.issues.listForRepo({
      owner, repo,
      state: 'open',
      per_page: 100,
      page: page
    });

    if (data.length === 0) {
      hasNextPage = false;
    } else {
      allItems = allItems.concat(data);
      page++;
    }
  }

  return allItems;
}

run();
