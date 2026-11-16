# Chai Tracker

A personal chai diary. Track each cup, its cost, and estimated caffeine remaining.

[Open Chai Tracker](https://chai-tracker.vercel.app/)

## Features

- Email and password sign-up/sign-in with Firebase Authentication.
- Log any of 36 chai types, including caffeine-free teas, with its cost in rupees.
- Backdate a cup by hours and minutes.
- See estimated active caffeine, daily averages, total cost, and your three most consumed teas.
- Open a history entry for its cost, time since consumption, and caffeine details.
- Save entries in Cloud Firestore and keep your chosen light or dark theme across reloads.
- Responsive layouts, keyboard-accessible dialogs, visible focus states, and reduced-motion support.

Caffeine estimates use the existing five-hour half-life calculation and 48-hour window. The redesign preserves the original calculations and data format.

## Screenshots

Light theme, with sample records:

![Chai Tracker in light mode](./screenshots/desktop-light.png)

Dark theme, with the same sample records:

![Chai Tracker in dark mode](./screenshots/desktop-dark.png)

Full desktop screenshots include the complete page, with padding on all four sides. They use isolated sample records, not personal records.

## Design

The pink poster composition, Bricolage Grotesque typography, pill controls, and original chai illustrations follow the supplied [design guide](./DESIGN.md). Statistics and footer panels follow the selected theme. The font is hosted locally with its [SIL Open Font License](./public/fonts/OFL.txt).

## Stack

React 19, JavaScript, Tailwind CSS 4, Vite 6, Firebase Authentication, and Cloud Firestore. Hosted on the existing Vercel project.

## Run locally

```sh
npm install
```

Create an ignored `.env.local` file with your Firebase project's values:

```dotenv
VITE_FIREBASE_APIKEY=your_api_key
VITE_FIREBASE_AUTHDOMAIN=your_auth_domain
VITE_FIREBASE_PROJECTID=your_project_id
VITE_FIREBASE_STORAGEBUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGINGSENDERID=your_sender_id
VITE_FIREBASE_APPID=your_app_id
```

Enable email/password authentication and configure appropriate Firestore access rules for `users/{uid}` in your Firebase project. Existing service configuration and access rules are unchanged.

```sh
npm run dev
```

## Checks

```sh
npx playwright install chromium
npm run lint
npm run build
npm test
```

Browser tests run the real components and auth provider with isolated Firebase adapters. They cover auth states, logging, backdating, merge writes, resets, failed saves, calculations, history details, themes, accessibility, and responsive layouts without accessing real records. See [QA.md](./QA.md) for verification details and limits.
