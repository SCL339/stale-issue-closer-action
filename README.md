# Stale Issue Closer Action

---

- **Configurable** — set your own stale/close thresholds, labels, and exemptions
- **Exempt labels** — skip issues/PRs with specific labels (e.g., `security`, `pinned`)
- **Dry-run mode** — preview changes without making them
- **Automatic comments** — informs contributors before closing

---

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

---

|-------|---------|-------------|
| `repo-token` | `${{ github.token }}` | GitHub token for API auth |
| `stale-days` | `30` | Days before marking as stale |
| `close-days` | `7` | Days after stale before closing |
| `stale-label` | `stale` | Label to apply when stale |
| `close-label` | `stale-closed` | Label to apply when closed |
| `exempt-labels` | `security,pinned` | Labels that prevent auto-stale |
| `dry-run` | `false` | Set `true` to only log, not act |

---

2. Checks each against exempt labels (skips if present)
3. If inactive > `stale-days`, adds stale label + comment
4. If already stale and inactive > `stale-days + close-days`, closes with comment

---

- 🚀 **Deploy your frontend** on [Vercel](https://vercel.com/?utm_source=scl339&utm_campaign=oss)
- ⭐ **Star this repo** to help others discover it

---

---

## 🤝 赞助支持 (Sponsor)

如果这个项目对你有帮助，可以请我喝杯咖啡 ☕

- 💖 **支付宝 (Alipay)**: `18559219554` | 邮箱联系: `530765059@qq.com`
- ☁️ **DigitalOcean 联盟链接**: [免费 $200 额度](https://www.digitalocean.com/?refcode=scl339-01&utm_campaign=Referral_Invite&utm_medium=opensource&utm_source=SCL339)
- ⭐ **在 GitHub 上点 Star** 帮助更多人发现这个项目

## 📄 License