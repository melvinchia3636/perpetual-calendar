# qmrl888 almanac

Offline Chinese almanac engine — full day details plus a 宜/忌 month search.
No network, no scraping, no filesystem.

- **Day details** — 宜忌, 农历, 干支, 值神, 建除, 时辰, 吉神/凶煞, 九星, 二十八宿, 灶马头…
- **Month search** — find the days/时辰 good for a specific 宜 or 忌 activity.

Built with **Bun + TypeScript** on top of `lunar-javascript` 1.7.7. Works in
**Expo / React Native** and any modern JS runtime.

## How it works

Everything is computed locally by `lunar-javascript`. The 宜/忌 rule is
**sect 1**: on a 节 day the whole day belongs to the new month. Day details
and month search use the same call (`getDayYi(1)` / `getDayJi(1)`), so they can
never disagree.

This differs from qmrl888's own data on the 12 节 days, because the site uses
an older library version with the exact-time rule. That is a deliberate
product choice.

## Architecture

```
src/lib/
├── index.ts                 Bun CLI (excluded from app tsconfig)
├── core/
│   ├── types.ts             Almanac / TimeSlot / DayDetails
│   ├── dates.ts             strict dayjs parsing
│   ├── day.ts               getDay() — full day details
│   ├── find-good-days.ts    findGoodDays() — month 宜/忌 search
│   └── index.ts             public API
├── expo/
│   └── index.ts             re-export for Expo / React Native
└── types/
    └── lunar-javascript.d.ts
```

No Bun, Node, DOM or network APIs in the core.

## Install

```bash
bun install
```

## CLI

```bash
# One day's details
bun run src/lib/index.ts 2026-10-30

# Days in a month that suit an activity
bun run src/lib/index.ts 2026-10 --yi 嫁娶
bun run src/lib/index.ts 2026-10 --yi 嫁娶 --hour
bun run src/lib/index.ts 2026-10 --yi 嫁娶 --both
bun run src/lib/index.ts 2026-10 --ji 开市 --hour

bun run typecheck
```

Everything runs in ~0.03s and makes zero network requests.

### Search output

```jsonc
{
  "month": "2026-10",
  "activity": "嫁娶",
  "type": "yi",
  "scope": "both",
  "matches": [
    {
      "date": "2026-10-01",
      "weekday": "星期四",
      "lunar": "二〇二六年八月二十",
      "ganzhiDay": "戊申",
      "tianshen": "天牢",
      "yi": ["祭祀", "..."],
      "ji": ["..."],
      "dayMatch": false,              // day-level 宜 does not contain 嫁娶
      "hours": [                      // but these 时辰 do
        {
          "startTime": "03:00",
          "endTime": "04:59",
          "ganzhi": "甲寅",
          "tianshen": "天刑",
          "luck": "凶",
          "yi": ["嫁娶", "..."],
          "ji": ["..."]
        }
      ]
    }
  ]
}
```

Scopes:

| Scope | Returns days where… |
|---|---|
| `day` (default) | the day-level 宜/忌 list contains the activity |
| `hour` | at least one 时辰 contains it |
| `both` | either of the above |

`type: 'ji'` finds days that are **bad** for the activity instead.

## Expo / React Native

```ts
import { getDay, findGoodDays } from './src/lib/expo';

// Full day details
const details = getDay('2026-10-30');
console.log(details.almanac.yiji);

// Month search
const good = findGoodDays('2026-10', '嫁娶', {
  type: 'yi',      // or 'ji'
  scope: 'both',   // 'day' | 'hour' | 'both'
});

good.matches.forEach((day) => {
  console.log(day.date, day.weekday, day.ganzhiDay, 'dayMatch:', day.dayMatch);
  day.hours.forEach((hour) => {
    console.log('  ', hour.startTime, hour.endTime, hour.ganzhi, hour.luck);
  });
});
```

Both functions are synchronous and return plain JSON.

## Core API

```ts
import { getDay, findGoodDays, parseDay, parseMonth } from './src/lib/core';

const details = getDay(parseDay('2026-10-30'));

const result = findGoodDays(parseMonth('2026-10'), '嫁娶', {
  type: 'yi',
  scope: 'both',
});

console.log(result.matches.map((day) => day.date));
```

## Shape

```ts
interface DayDetails {
  date: string;      // "2026-10-30"
  almanac: Almanac;
}
```

`Almanac` contains:

| Field | Meaning |
|---|---|
| `yiji` | 宜 / 忌 lists |
| `solarYmd`, `lunarYmd` | 公历 / 农历 date |
| `weekIndex`, `weekOfYear`, `weekOfMonth` | weekday and week numbers |
| `solarFestivals`, `lunarFestivals` | festivals (节气 included) |
| `ganzhi` | 年/月/日 干支 |
| `shengxiao` | 年/月/日 生肖 |
| `nayin` | 年/月/日 纳音 |
| `zhixing` | 十二建 (建/除/满/…) |
| `tianshen` | 值神 + 黄道/黑道 + 吉凶 |
| `jishen`, `jishenxiongsha` | 吉神方位 + 吉神/凶煞 lists |
| `chongsha` | 冲煞 (day and time) |
| `pengzu` | 彭祖百忌 |
| `taishen` | 胎神 |
| `timeList` | 13 时辰 with 干支/星神/宜忌/冲煞/九星 |
| `xiu` | 二十八宿 + 歌诀 |
| `lu`, `shou`, `gong`, `yue` | 日禄 / 神兽 / 四宫 / 月相 |
| `nine` | 日/时 九星 (玄空/奇门/太乙 full string) |
| `zmt` | 灶马头 |

## Notes

- Fully offline: `getDay` and `findGoodDays` never touch the network.
- `lunar-javascript` is pinned to `1.7.7` and called with `sect 1` (whole 节
  day = new month).
- Compared with qmrl888's older data, 1.7.7 also fixes duplicate 宜忌 entries,
  typos (`雇庸`→`雇佣`), 吉神/凶煞 tables, and the site's 灶马头 `gongZhu` bug.
- If exact qmrl888 parity is ever needed: pin `1.6.10` and call
  `getDayYi(2)` / `getDayJi(2)`.
