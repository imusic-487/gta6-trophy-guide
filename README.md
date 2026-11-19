# Leonida Trophy Atlas — GTA 6 Trophy Guide & Tracker

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/imusic-487/gta6-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/imusic-487/gta6-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![License: MIT](https://img.shields.io/github/license/imusic-487/gta6-trophy-guide)](LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/imusic-487/gta6-trophy-guide)](https://github.com/imusic-487/gta6-trophy-guide/commits/main)
[![Trophies: 55 official](https://img.shields.io/badge/trophies-55%20official-brightgreen)](app/data/trophies.json)

An offline, open-source trophy guide and tracker for **Grand Theft Auto VI** (PS5): all **55 official trophies** — 1 platinum, 2 gold, 6 silver, 46 bronze, 28 hidden — with a guide in the author's own words for each one, a platinum roadmap, missable warnings, and a checklist that lives in your browser.

Built for the [make.fun bounty gta6-trophy-guide-01](https://make.fun/bounty/gta6-trophy-guide-01).

## Use it

No build step, no server needed, no network at all:

```sh
# Option 1: just open it
open app/index.html        # or double-click it in your file manager

# Option 2: serve it locally
node serve.ts              # then open http://localhost:8080
```

## What it does

- **All 55 trophies** — official names, descriptions and grades, checked against the official PS5 list (Exophase & PSNProfiles agree on every entry; cross-checked with Push Square, OutputLag and Keengamer).
- **Search + filters** — free-text search, filter by grade, and by type: story, missable, collectibles, activities, completion, online (there are no online trophies — all 55 are single-player, and the filter shows that).
- **Progress tracking** — tick trophies earned; progress is saved in `localStorage` with a progress bar, and can be exported / imported as JSON.
- **Spoiler shield** — on by default: hidden trophies stay masked (name, description and guide) until you tick them earned.
- **Platinum roadmap** — four phases in order, plus a callout for the two missables:
  - *Positive Mental Attitude* — the first meditation spot is a balcony in Chapter 1; miss it and the trophy is gone for the playthrough.
  - *Strangers & Freaks* — the Chapter 3 step Race Against Yago is timed.
  - There is no mission replay and no second playthrough, so the guide tells you to make a manual save at the start of every chapter.
- **Cited guidance** — every trophy card names its source. Guides are written in the author's own words; other guides were used as sources and cited, never copied.

## Files

- `app/index.html`, `app/style.css`, `app/app.js` — the guide (static, dependency-free).
- `app/data/trophies.json` — the 55 trophies with guides, types, missable and spoiler flags, and a source per trophy.
- `screenshots/` — 4 real renders of the guide (cover, roadmap, silver filter, missable filter).
- `main.ts` — hands the guide in for the make.fun bounty (copies `app/` + `screenshots/` and writes `dossier.json`).
- `serve.ts` — tiny local static server for development.

## Sources

- Trophy list: <https://www.exophase.com/game/grand-theft-auto-vi-psn/trophies/> and <https://psnprofiles.com/trophies/43531-grand-theft-auto-vi>
- Cross-checks: <https://www.pushsquare.com/news/2026/11/gta-6-ps5-trophies-revealed-100percent-completion-needed-for-the-platinum>, <https://outputlag.com/guides/gta-6-trophy-list/>, <https://www.keengamer.com/articles/guides/gta-6-trophy-guide-platinum-roadmap-all-55-trophies/>, <https://www.gtavicecityhub.com/achievements>

## License

MIT — see [LICENSE](LICENSE). Unofficial fan guide; not affiliated with, endorsed by, or connected to Rockstar Games or Take-Two Interactive.
