# UI refresh

15 November 2026. Baseline: `b4a329416f7e61a2c0b11dbac0539cb7f88717e7`.

Adapted from the accompanying OpenDesignMD reference. Existing project stack, copy, data, routing, authentication and business logic are preserved. Application changes are a presentation stylesheet and its import only. No new runtime dependency. Existing dark themes and reduced-motion preferences are retained. Original reference assets/fonts/logos are not copied.

Verified: `npm run build` passed. Desktop/mobile Chromium checks passed for rendering, responsive width and opening the existing sign-in modal. Local preview reused only the existing browser-public Firebase configuration from the deployed application; no secret/environment file was created or committed. No real account was created and no consumption data was written. Business source hashes match the baseline after removing the single CSS import.

The user authorized commit/push; deployment status is tracked in Portfolio V3 context/ui-refresh-status.md.
