// Побочный модуль: устанавливает мок chrome.* до загрузки кода приложения.
// Импортируется первым в .storybook/preview.tsx
import { installChromeMock } from './chrome-mock'

installChromeMock()
