---
type: always
name: project-overview
description: Project overview for Jared
alwaysApply: true
applyTo: '**'

---
# Jared project – Project overview

Audience: contributors familiar with TS/React, WebExtension build tooling, Jest and Playwright. This page gives a concise map of how the project is wired.

Date: 2025‑09‑23


## Toolchain and build

- App type: Chrome WebExtension (Manifest V3 via webextension-toolbox).
- Builder: webextension-toolbox with a custom webpack factory (create-webpack-config.js).
- Transpilation: babel-loader + ts-loader (strict TS config).
- Source maps: inline in dev, external in prod (configured in create-webpack-config.js).
- Env vars: dotenv-webpack with safe=true and systemvars=true. Provide a .env (or ensure CI env has required keys). If .env.example exists, it is used for required key validation.
- Static assets:
  - CSS Modules enabled for both `*.module.css` and plain `*.css` (modules.auto = true). Local ident:
    - Dev: `[folder]__[local]--[hash:base64:8]`
    - Prod: short hash
  - SVGs: svg-sprite-loader + svgo; symbolId is hashed (`[name]-[hash:8]` in dev, `[hash:8]` in prod).
- Type checking: ForkTsCheckerWebpackPlugin against repo tsconfig.json.


## Path aliases

- Webpack aliases: components, containers, hooks, utils, pages, assets, store, styles, types, src, storybook, package (see create-webpack-config.js).
- TypeScript paths mirror the above (see tsconfig.json). Prefer alias imports to deep relative paths.
- Jest mappings for the same aliases are defined in jest.config.ts (moduleNameMapper).


## Quickstart

- Install deps: `npm ci` (or `npm install`)
- Dev (Chrome): `npm run dev`
- Build (Chrome): `npm run build`
- Unit tests: `npm test`
- E2E tests: `npm run test:playwright`
- Lint: `npm run lint`


## Repository layout

- Source: `src/`
- Unit test rootDir for Jest: `src/` (important for placing tests)
- Playwright tests: `playwright/`
- Webpack factory: `create-webpack-config.js`
- Configs: jest.config.ts, tsconfig.json, tsconfig.jest.json, playwright.config.ts


## Notes specific to the extension

- Redux Toolkit is used; remote Redux DevTools supported via `npm run redux-devtools` (connect to localhost:1024). State persistence via redux-persist-webextension-storage.
- React 18 with CSS Modules and modern CSS reset. Themes live in `utils/themes`.
- Storybook is available (webpack 5): `npm run storybook`; includes CSS Modules, a11y, and interactions addons.
