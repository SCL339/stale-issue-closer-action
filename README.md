# Stale Issue Closer Action

A GitHub Action that automatically closes stale issues and pull requests after a configurable period of inactivity.

## Features

- **No Docker required** — lightweight Node.js composite action
- **Configurable** — set your own stale/close thresholds, labels, and exemptions
- **Exempt labels** — skip issues/PRs with specific labels (e.g., `security`, `pinned`)
- **Dry-run mode** — preview changes without making them
- **Automatic comments** — informs contributors before closing

## Usage

Create a workflow file (e.g., `.github/workflows/stale.yml`) in your repository:

```yaml
name: Close stale issues/PRs
on:
  schedule:
    - cron: '0 6 * * 1'   # Every Monday at 6 AM UTC
  workflow_dispatch:       # Allow manual trigger

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: SCL339/stale-issue-closer-action@v1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          stale-days: '30'
          close-days: '7'
          stale-label: 'stale'
          close-label: 'stale-closed'
          exempt-labels: 'security,pinned'
          dry-run: 'false'
```

## Inputs

| Input | Default | Description |
|-------|---------|-------------|
| `repo-token` | `${{ github.token }}` | GitHub token for API auth |
| `stale-days` | `30` | Days before marking as stale |
| `close-days` | `7` | Days after stale before closing |
| `stale-label` | `stale` | Label to apply when stale |
| `close-label` | `stale-closed` | Label to apply when closed |
| `exempt-labels` | `security,pinned` | Labels that prevent auto-stale |
| `dry-run` | `false` | Set `true` to only log, not act |

## How It Works

1. Fetches all open issues and PRs
2. Checks each against exempt labels (skips if present)
3. If inactive > `stale-days`, adds stale label + comment
4. If already stale and inactive > `stale-days + close-days`, closes with comment

## License

MIT
