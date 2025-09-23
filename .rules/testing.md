---
id: testing
scope: always
description: Testing guidelines for Jared (Jest and Playwright)
tags: [rules, docs, testing]
alwaysApply: true
applyTo: "**"
---

# Jared project – Testing

Audience: contributors writing and running tests for the extension. Covers Jest (unit) and Playwright (browser) specifics of this repo.

Date: 2025‑09‑23


## Unit tests (Jest)

- Runner: Jest 29 with jsdom environment.
- Preset/transform: `ts-jest/presets/js-with-ts`; transform `^.+\.(ts|tsx)$` via ts-jest using tsconfig.jest.json.
- Root directory: tests are resolved relative to `src/` (jest.config.ts sets `rootDir: './src'`). Place tests inside `src/`.
- Test match: `**/?(*.)+(spec).[tj]s?(x)`.
- Setup: `src/__setups__/chrome.ts` runs before tests (setupFiles).
  - Provides a Chrome Extensions History API mock using `jest-webextension-mock` and `@plq/faker`.
  - `chrome.history.search` is async and spy-able. Extend the setup file if you need additional APIs.
- ModuleNameMapper:
  - CSS: `jest-css-modules` (stubs class names; avoid asserting on generated hashes).
  - SVG: `jest-svg-transformer`.
  - TS path aliases mirrored (e.g., `^utils/(.*)$ -> <rootDir>/utils/$1`).
- Coverage: collected to `src/.jest/coverage` (relative to rootDir).

Scripts:
- Run all: `npm test`
- Watch: `npm run test:watch`
- CI mode (with coverage): `npm run test:ci`
- Coverage locally: `npm run test:coverage`

Guidelines:
- Keep tests close to code or in a parallel folder under `src/` so module resolution and rootDir work as intended.
- Prefer alias imports: `import { something } from 'utils/foo'`.
- If you need to mock Chrome APIs beyond history, add them to `src/__setups__/chrome.ts` rather than per-test stubs.
- For snapshot tests involving CSS Modules, rely on the identity mapping; do not assert exact class strings.

Run a single file:
- `npx jest src/utils/history/helpers.spec.ts`

Add a new test (validated example):
1. Create `src/smoke/demo.spec.ts` with an alias import, e.g. `import { sortByVisitCount } from 'utils/array'`.
2. Add a simple assertion using that function.
3. Run `npm test`; ensure it passes with the suite.
4. Remove temporary smoke tests when done.


## Browser/E2E tests (Playwright)

- Config file: `playwright.config.ts`
  - testDir: `./playwright`
  - reporter: `html`
  - retries: 2 on CI; workers: 1 on CI, parallel locally
  - project: Chromium channel `chrome`, `colorScheme: 'dark'`
- Scripts:
  - Run: `npm run test:playwright`
  - Headed/UI: `npm run test:playwright:ui`
  - CI-headed: `npm run test:playwright:ci`
  - Coverage (if used in tests): `npm run test:playwright:coverage`
- Notes:
  - Ensure Google Chrome is installed for the configured channel.
  - If you need a web server, configure `webServer` in the Playwright config (currently commented out).
