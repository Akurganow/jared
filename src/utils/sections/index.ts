import { nanoid } from 'nanoid'
import type { SectionItem } from 'types/sections'

export function createNewSection<T extends SectionItem>(section: T): T {
	return {
		...section,
		id: nanoid(),
	}
}
