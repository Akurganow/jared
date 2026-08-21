// Приложение собирается под Chrome; в firefox-подобных браузерах API лежит в window.browser,
// но типизацию нормализуем к типам Chrome
export type Browser = typeof chrome
export type HistoryItem = chrome.history.HistoryItem
export type HistoryQuery = chrome.history.HistoryQuery | chrome.history.HistoryQuery[]
export type BookmarkSearchQuery = chrome.bookmarks.SearchQuery
export type BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode
export type BookmarkCreateArg = chrome.bookmarks.CreateDetails
