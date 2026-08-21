// Данные закладки, которыми оперируют формы: полный BookmarkTreeNode
// содержит обязательные служебные поля (syncing и т.п.), которые пользователь не задаёт
export type BookmarkDraft = { title: string; url?: string }
export type BookmarkEdit = BookmarkDraft & { id: string }
