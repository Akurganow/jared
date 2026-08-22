# Jared — руководство для AI-агента

Chrome-расширение (Manifest V3), заменяющее новую вкладку: секции с историей браузера
(VCS/ITS-провайдеры: GitHub, GitLab, Jira, YouTrack), закладками и настройками.
React 19 + Redux Toolkit 2 + CSS Modules, сборка webpack (webextension-toolbox).

## Главное правило

**Реальный Chrome для разработки не нужен.** Вся среда построена так, чтобы код можно
было разрабатывать и проверять без запуска расширения:

- **Storybook** — основная среда разработки UI (компоненты и целые экраны на моках chrome.*)
- **Jest** — unit-тесты утилит, интеграционные тесты стора, компонентные тесты (Testing Library)
- **Storybook test-runner** — композиционные interaction-тесты (play-функции) в headless Chromium
- **Playwright** (`playwright/`) — e2e с реальным собранным расширением; медленный слой, запускается точечно

## Команды

| Команда | Что делает |
|---|---|
| `npm ci` | установка зависимостей (Node из `.nvmrc`) |
| `npm run lint` / `npm run lint:fix` | Biome: линт + формат (конфиг `biome.json`) |
| `npx tsc --noEmit` | типизация (TypeScript 6, strict) |
| `npx jest` | все Jest-тесты (`src/**/*.spec.ts(x)`) |
| `npx jest путь/к/файлу.spec.ts` | один файл |
| `npm run storybook` | Storybook на :6006 с HMR |
| `npm run build-storybook` | статическая сборка Storybook |
| `npm run test-storybook -- --url http://127.0.0.1:6006` | interaction-тесты по запущенному/отданному Storybook (нужен `npx playwright install chromium`) |
| `npm run build` | сборка расширения → `dist/chrome` + zip в `packages/` |
| `npm run dev` | watch-сборка в `dist/chrome` с автоперезагрузкой загруженного расширения |

Полный цикл interaction-тестов без dev-сервера:

```sh
npm run build-storybook
npx concurrently -k -s first "npx http-server storybook-static --port 6006 --silent" \
  "npx wait-on tcp:127.0.0.1:6006 && npm run test-storybook -- --url http://127.0.0.1:6006"
```

## Слои тестирования — что куда класть

1. **Unit (утилиты, процессоры истории)** — `*.spec.ts` рядом с кодом в `src/utils/**`.
   Chrome API замокан в `src/__setups__/chrome.ts`, данные — `@plq/faker` и `src/__mocks__/history.ts`.
2. **Интеграция стора** — `src/store/__tests__/*.spec.tsx`: боевые редьюсеры + экшены + селекторы
   через `configureMockStore` (без persist и браузера).
3. **Компонентные (jsdom)** — `*.spec.tsx` рядом с компонентом: Testing Library +
   `@testing-library/jest-dom` (подключён в `src/__setups__/testing-library.ts`).
4. **Композиционные (Storybook play)** — `*.stories.tsx`: связки компонентов и контейнеры
   с реальным стором (`storybook-fixtures/mock-store`) и моком chrome
   (`.storybook/fixtures/chrome-mock.ts`). Пример целого экрана: `src/containers/NewTab/index.stories.tsx`.
5. **E2E (Playwright)** — `playwright/`: реальный Chrome с собранным `dist/chrome`.

Test-runner дополнительно гоняет по каждой стори a11y-проверки (addon-a11y) — падения
доступности являются ошибками, чини компонент, а не тест.

## Моки chrome.\*

- Jest: `src/__setups__/chrome.ts` (`jest-webextension-mock` + генератор истории). Новые API добавляй туда.
- Storybook: `.storybook/fixtures/chrome-mock.ts` — in-memory `history`, `bookmarks`, `storage`,
  `runtime.getURL` (заглушка фавиконок из `.storybook/public/favicon-mock.svg`).
  Устанавливается первым импортом в `.storybook/preview.tsx`.
- Обёртки над браузерными API живут в `src/utils/api/` и резолвят `window.browser ?? window.chrome`
  **лениво** — код приложения не должен обращаться к `chrome.*` напрямую (кроме типов).

## Конвенции

- Импорты только через алиасы: `components/*`, `containers/*`, `utils/*`, `store/*`, `types/*`,
  `src/*`, `package`, `storybook-fixtures/*`. Новый алиас синхронизируй в трёх местах:
  `tsconfig.json` (paths), `create-webpack-config.js` (resolve.alias), `jest.config.ts` (moduleNameMapper).
- Стиль кода — Biome: табы, одинарные кавычки, без точек с запятой. Не спорь с форматтером,
  запускай `npm run lint:fix`.
- Компоненты — именованные функции (`export default function Name()`), у интерактивных элементов
  обязательны `type="button"`, доступные имена и `data-testid` для тестов.
- Redux: typescript-fsa экшены + reducerWithInitialState (см. `src/store/`), селекторы через reselect.
- Стори: `Meta`/`StoryObj` из `@storybook/react-webpack5`, интеракции из `storybook/test`.

## Перед коммитом

`npm run lint && npx tsc --noEmit && npx jest` — минимум. Если менял UI — прогони ещё
build-storybook + test-storybook. Если менял сборку — `npm run build`.

Подробнее: `.rules/project-overview.md`, `.rules/testing.md`, `.rules/dev-policy.md`.
