---
id: dev-policy
scope: always
description: Development policy and conventions for Jared
tags: [rules, docs, policy]
alwaysApply: true
applyTo: "**"
---

# Jared project – Development policy and conventions

Audience: developers contributing code. This document captures conventions, policies, and gotchas specific to this repository.

Date: 2025‑09‑23


## Code style and linting

- Biome (линтер + форматтер): рекомендованные правила + react/test-домены, a11y, циклы импортов, hooks-правила.
  - Конфиг: `biome.json`. Запуск: `npm run lint`, автофикс: `npm run lint:fix`.
  - Форматирование: табы, одинарные кавычки, без точек с запятой (semicolons: asNeeded).
- TypeScript is strict: strictNullChecks, noImplicitAny/This/Returns, etc. Prefer explicit types and avoid `any`.
- Keep functions small and pure where possible. Prefer data-first utilities and avoid side effects in selectors and reducers.


## State management and UI

- Redux Toolkit; use createSlice and createAsyncThunk (or fsa-thunk where appropriate).
- Persist state with redux-persist-webextension-storage when needed; be mindful of quota constraints of extension storage.
- Use React 18 with CSS Modules. Avoid global CSS leaks; prefer module-scoped styles.


## Path alias discipline

- Always import via configured aliases (`utils/*`, `components/*`, etc.).
- When adding a new top-level path, update all of the following to keep the ecosystem in sync:
  - tsconfig.json (compilerOptions.paths)
  - create-webpack-config.js (resolve.alias)
  - jest.config.ts (moduleNameMapper)


## Testing policy

- Unit tests accompany new logic. Place tests under `src/` so Jest’s rootDir resolution applies.
- Use existing chrome mocks in `src/__setups__/chrome.ts`. Extend them centrally if you need more APIs.
- Prefer `@plq/faker` for generating mock history items to remain consistent with existing test data.
- For UI logic, add Storybook stories and, when valuable, Playwright tests in `playwright/`.


## History processing utilities

- Utilities related to ITS/VCS and browser history live under `src/utils/history`.
- Reuse helpers from `src/utils/history/history.mock.ts` when adding new processors.
- Tests in this area rely on the Chrome mock and faker; align with existing patterns.


## Commit and tooling

- Husky is installed; keep hooks fast. Prefer lint-staged patterns if added later.
- Use `redux-devtools` script for remote debugging when working on state-heavy flows.


## Documentation structure

- Keep rule docs scoped:
  - project-overview.md — high-level build/tooling overview and quickstart.
  - testing.md — how to run/add tests and testing-specific patterns.
  - dev-policy.md — conventions and policies (this file).
