# Redesign verification

Verified 16 November 2026 against baseline `c3cc2cf`.

## Scope

- React 19, JavaScript, Tailwind 4, Vite 6 and Firebase retained.
- Firebase service configuration, auth provider behavior, Firestore collection, document IDs and entry schema retained.
- Firestore writes still merge `{ [timestamp]: { name, cost } }` into `users/{uid}`. Hour/minute offsets and cost values are unchanged.
- Calculations, 36 chai options, caffeine amounts, status thresholds and descriptions match the baseline. Compared all exported utility results across 100 generated histories with a fixed clock.
- Form values now visibly reset after a successful save. Failed saves keep values for retry and no longer show an unsaved entry as saved.
- Native dialogs provide focus containment, Escape dismissal and focus restoration. History entries are keyboard buttons. Inputs have labels and selection states are announced.
- Bricolage Grotesque is hosted locally with its SIL Open Font License in `public/fonts/OFL.txt`. Illustrations are original SVG components. The supplied guide and its MIT notice remain in `DESIGN.md`.

## Passed

- `npm run build`: production build.
- `npm run lint`: no errors or warnings.
- `npm test`: 14 Playwright tests across desktop Chromium and mobile Chromium, with 320px narrow layout coverage.
- Guest auth gate; failed sign-in; sign-up confirmation; sign-in and sign-out states.
- Chai selection, all additional chai options, decimal cost, backdated hours/minutes, merge-write payload, reset and failed-save retry state.
- Caffeine decay, status categories, daily and total values, tea rankings and percentages, history order and detail modal.
- Mocked auth and history persistence across reload, and real browser localStorage theme persistence.
- Axe WCAG A/AA checks on guest, dialog, populated tracker, light and dark states; horizontal overflow and reduced-motion checks.
- Visual inspection of desktop and mobile light/dark layouts and populated tracker screenshots.

## Limits and inherited findings

Firebase authentication and persistence are tested through isolated test adapters using the real app components and auth provider. Test adapters are selected only by `vite.test.config.js`; production uses the unchanged Firebase configuration. These tests make no requests to Firebase and do not modify real records. A real-account sign-in and Firestore write were not performed.

The original footer's Privacy Policy, Terms of Service and Contact Us anchors are retained; the original project has no corresponding policy/contact documents.

The production build retains the existing large Firebase bundle warning. A compatible Vite 6 patch and safe transitive dependency patches were applied. `npm audit` still reports four high findings through Firebase 11's Node gRPC dependency; no forced Firebase major change was made as part of this interface redesign.

## Deployment

The existing Vercel project is `chai-tracker`, connected to `the-ajay-panigrahi/chai-tracker`, production branch `main`, at https://chai-tracker.vercel.app/. No new hosting service, paid asset, plan upgrade or billing change is needed.

## Theme polish

Removed the decorative arrow beneath “your daily cup of clarity.” Statistics, its cards and table, and the closing footer panel now follow the selected light/dark theme. README screenshots were refreshed using sample records, and portfolio-v3’s saved Chai Tracker image was refreshed separately.
