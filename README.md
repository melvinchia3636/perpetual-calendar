<center>
  <h1 align="center">🗓 万年历 (Perpetual Calendar)</h1>
  <p align="center">A fully offline Chinese almanac and auspicious-date planner for Android.</p>
</center>

## 🤔 The Problem

Chinese almanac (黄历) apps are usually loaded with ads, require an internet
connection, or hide the useful 宜/忌 information behind paywalls. Checking
which days are suitable for a wedding, moving house, or opening a business
should be quick, private, and work anywhere.

## 💡 The Solution

万年历 is a native Android app with a fully offline almanac engine. Everything
is calculated on-device from the bundled `lunar-javascript` library - no
network calls, accounts, or trackers.

- **Monthly almanac calendar** - lunar dates, solar terms, and festivals on every cell.
- **Day details sheet** - 宜忌, 值神, 吉神/凶煞, 冲煞, 纳音, 二十八宿, 建除十二神, and more.
- **Auspicious-day search** - filter a month by an activity, choosing 宜 or 忌.
- **Auspicious-hour search** - narrow results to the 时辰 (double-hour) level.
- **Native feel** - dark red theme, swipeable month pager, and animated transitions built with Reanimated.

## 📂 Project Structure

```
src/
├── App.tsx                  app shell, theme, and tab switching
├── components/              shared UI (month picker, modals, entries)
├── contexts/                global app state
├── lib/
│   ├── core/                offline almanac engine (lunar-javascript wrapper)
│   └── constants/           activities and zodiac data
└── screens/
    ├── CalendarScreen/      month calendar + day bottom sheet
    └── SearchTabScreen/     search form + result screens
```

## 🖥 Screenshots

<div align="center">
  <img width="49%" alt="Monthly almanac calendar" src="./screenshots/1.jpg" />
  <img width="49%" alt="Day details sheet" src="./screenshots/2.jpg" />
  <img width="49%" alt="Auspicious-day search form" src="./screenshots/3.jpg" />
  <img width="49%" alt="Auspicious-day search results" src="./screenshots/4.jpg" />
</div>

## 🔬 Technologies Used

![TypeScript](https://img.shields.io/badge/-TYPESCRIPT-FF0000?style=for-the-badge&logo=typescript&logoColor=white&color=3178C6)
![React Native](https://img.shields.io/badge/-REACT_NATIVE-FF0000?style=for-the-badge&logo=react&logoColor=white&color=61DAFB)
![Expo](https://img.shields.io/badge/-EXPO-FF0000?style=for-the-badge&logo=expo&logoColor=white&color=000020)
![Tailwind CSS](https://img.shields.io/badge/-TAILWIND_CSS-FF0000?style=for-the-badge&logo=tailwindcss&logoColor=white&color=22D3EE)
![Reanimated](https://img.shields.io/badge/-REANIMATED-FF0000?style=for-the-badge&logo=react&logoColor=white&color=E5484D)

## ⌨️ Setup

If you want to run this project on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/melvinchia3636/perpetual-calendar.git
   cd perpetual-calendar
   ```
2. Install dependencies:
   ```bash
   bun install
   ```
3. Start the development server:
   ```bash
   bun run dev
   ```
4. Build and run on an Android device or emulator:
   ```bash
   bun run android
   ```

## 📈 Status

This project is completed. If you find a bug or have a feature request, please
open an issue - contributions are welcome.

## 💡 Inspirations

Inspired by traditional Chinese 黄历 and the daily almanac information people
rely on for choosing auspicious dates - and by my father, who has always
consulted the 黄历 for religious and fengshui matters.

## 🙏 Credits

- [`lunar-javascript`](https://github.com/6tail/lunar-javascript) by 6tail -
  powers the offline almanac engine (lunar dates, 宜忌, 神煞, 纳音, 星宿, and more).

## 📄 License

Copyright © 2026 Melvin Chia<br/>
Licensed under the [MIT License](LICENSE).
