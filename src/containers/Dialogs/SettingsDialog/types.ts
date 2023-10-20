import type { HTMLAttributes } from 'react'

export interface TabProps<T> extends HTMLAttributes<T> {
	setCanSave: (canSave: boolean) => void
}

export interface TabRef {
	save: () => void
}
