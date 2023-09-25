import type { ChangeEvent, HTMLAttributes } from 'react'

export interface TabProps<T> extends HTMLAttributes<T> {
	onChange?: (event: ChangeEvent<T>) => void
}
