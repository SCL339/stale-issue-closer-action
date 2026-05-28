1|     1|     1|# Stale Issue Closer Action
     2|     2|     2|
     3|     3|     3|---
     4|     4|     4|
     5|     5|     5|
     6|     6|     6|- **Configurable** — set your own stale/close thresholds, labels, and exemptions
     7|     7|     7|- **Exempt labels** — skip issues/PRs with specific labels (e.g., `security`, `pinned`)
     8|     8|     8|- **Dry-run mode** — preview changes without making them
     9|     9|     9|- **Automatic comments** — informs contributors before closing
    10|    10|    10|
    11|    11|    11|---
    12|    12|    12|
    13|    13|    13|
    14|    14|    14|  workflow_dispatch:       # Allow manual trigger
    15|    15|    15|
    16|    16|    16|jobs:
    17|    17|    17|  stale:
    18|    18|    18|    runs-on: ubuntu-latest
    19|    19|    19|    steps:
    20|    20|    20|      - uses: SCL339/stale-issue-closer-action@v1
    21|    21|    21|        with:
    22|    22|    22|          repo-token: ${{ secrets.GITHUB_TOKEN }}
    23|    23|    23|          stale-days: '30'
    24|    24|    24|          close-days: '7'
    25|    25|    25|          stale-label: 'stale'
    26|    26|    26|          close-label: 'stale-closed'
    27|    27|    27|          exempt-labels: 'security,pinned'
    28|    28|    28|          dry-run: 'false'
    29|    29|    29|```
    30|    30|    30|
    31|    31|    31|---
    32|    32|    32|
    33|    33|    33|
    34|    34|    34||-------|---------|-------------|
    35|    35|    35|| `repo-token` | `${{ github.token }}` | GitHub token for API auth |
    36|    36|    36|| `stale-days` | `30` | Days before marking as stale |
    37|    37|    37|| `close-days` | `7` | Days after stale before closing |
    38|    38|    38|| `stale-label` | `stale` | Label to apply when stale |
    39|    39|    39|| `close-label` | `stale-closed` | Label to apply when closed |
    40|    40|    40|| `exempt-labels` | `security,pinned` | Labels that prevent auto-stale |
    41|    41|    41|| `dry-run` | `false` | Set `true` to only log, not act |
    42|    42|    42|
    43|    43|    43|---
    44|    44|    44|
    45|    45|    45|
    46|    46|    46|2. Checks each against exempt labels (skips if present)
    47|    47|    47|3. If inactive > `stale-days`, adds stale label + comment
    48|    48|    48|4. If already stale and inactive > `stale-days + close-days`, closes with comment
    49|    49|    49|
    50|    50|    50|---
    51|    51|    51|
    52|    52|    52|ARKER
    53|    53|    53|- 🚀 **Deploy your frontend** on [Vercel](https://vercel.com/?utm_source=scl339&utm_campaign=oss)
    54|    54|    54|- ⭐ **Star this repo** to help others discover it
    55|    55|    55|
    56|    56|    56|
    57|    57|    57|---
    58|    58|    58|
    59|    59|    59|
    60|    60|    60|

---

## 🤝 赞助支持 (Sponsor)

如果这个项目对你有帮助，可以请我喝杯咖啡 ☕

- 💖 **支付宝 (Alipay)**: `18559219554` | 邮箱联系: `530765059@qq.com`
- ☁️ **DigitalOcean 联盟链接**: [免费 $200 额度](https://www.digitalocean.com/?refcode=scl339-01&utm_campaign=Referral_Invite&utm_medium=opensource&utm_source=SCL339)
- ⭐ **在 GitHub 上点 Star** 帮助更多人发现这个项目

## 📄 License
