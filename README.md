# Jared
[![Lint](https://github.com/Akurganow/jared/actions/workflows/lint.yml/badge.svg)](https://github.com/Akurganow/jared/actions/workflows/lint.yml)
[![Tests](https://github.com/Akurganow/jared/actions/workflows/tests.yml/badge.svg)](https://github.com/Akurganow/jared/actions/workflows/tests.yml)
[![Build](https://github.com/Akurganow/jared/actions/workflows/build.yml/badge.svg)](https://github.com/Akurganow/jared/actions/workflows/build.yml)

Browser extension for better way to work with browser history

![Jared](/promo/open-graph.png)

Supported providers:
- Issue tracker
  - Jira
  - YouTrack
- Version control
  - GitHub
  - GitLab

Supported browsers:
- Chrome

## Install

```sh
npm ci
```

Node-версия — в `.nvmrc` (`nvm use`).

## Development

Основная среда разработки UI — **Storybook** (реальный Chrome не нужен,
`chrome.*` замокан):

```sh
npm run storybook   # http://localhost:6006, с HMR
```

Разработка в реальном Chrome:

```sh
npm run dev
```

Watch-сборка кладёт распакованное расширение в `dist/chrome` — загрузите его один раз
через `chrome://extensions` → «Load unpacked», дальше расширение перезагружается
автоматически при каждом изменении кода (webpack-webextension-plugin).

## Tests

```sh
npm run lint        # Biome (линт + формат)
npx tsc --noEmit    # типизация
npx jest            # unit + интеграционные + компонентные тесты
```

Композиционные interaction-тесты (Storybook + headless Chromium):

```sh
npx playwright install chromium   # один раз
npm run build-storybook
npx concurrently -k -s first "npx http-server storybook-static --port 6006 --silent" \
  "npx wait-on tcp:127.0.0.1:6006 && npm run test-storybook -- --url http://127.0.0.1:6006"
```

E2E с реальным расширением: `npm run build && npm run test:playwright`.

## Build

```sh
npm run build
```

Готовый zip — в `packages/`, распакованная сборка — в `dist/chrome`.
Каждый CI-прогон workflow **Build** также публикует установочный артефакт
`packages` (Actions → Build → Artifacts): скачайте, распакуйте zip и установите
через «Load unpacked».

## Docs

* [CLAUDE.md](CLAUDE.md) — карта проекта и правила для AI-агентов (и людей)
* [.rules/](.rules) — обзор проекта, тестирование, конвенции
* [webextension-toolbox](https://github.com/webextension-toolbox/webextension-toolbox)
