import { reducerWithInitialState } from 'typescript-fsa-reducers'
import {
	addSection,
	switchEditMode,
	removeSection,
	splitSection,
	updateSectionSettings,
	setEditingSection,
	updateSectionItem,
	updateSectionType,
	setSectionItems,
	switchSectionItemPin, updatePinnedItems, setEditingItem,
} from 'store/actions/sections'
import { DEFAULT_CONTAINER_SECTION_SETTINGS, defaultSectionSettings } from 'store/constants/sections'
import { createNewSection } from 'utils/sections'
import { movePinnedItemBetweenArrays } from 'utils/history/helpers'
import type {
	SectionsState,
	SectionItemContainer,
	SectionItem,
	SectionItemHistory,
	SectionItemVCS, SectionItemITS
} from 'types/sections'

const createReducer = (initialState: SectionsState) => reducerWithInitialState(initialState)
	.case(addSection, (state, section) => ({
		...state,
		items: [
			...state.items,
			section,
		],
	}))
	.case(removeSection, (state, id) => ({
		...state,
		items: state.items.filter(section => section.id !== id),
	}))
	.case(splitSection, (state, id) => {
		console.log('splitSection', state, id)
		const section = state.items.find(section => section.id === id)
		const parent = state.items
			.filter(section => section.type === 'container')
			.find(section => (section as SectionItemContainer).items.includes(id)) as SectionItemContainer | undefined

		if (!section) return state

		const newSection1 = createNewSection(section)
		const newSection2 = createNewSection(section)
		const newContainer: SectionItemContainer = {
			id: section.id,
			type: 'container',
			settings: {
				...DEFAULT_CONTAINER_SECTION_SETTINGS,
				direction: parent
					? parent.settings.direction.value === 'row'
						? {
							...DEFAULT_CONTAINER_SECTION_SETTINGS.direction,
							value: 'column',
						}
						: {
							...DEFAULT_CONTAINER_SECTION_SETTINGS.direction,
							value: 'row',
						}
					: DEFAULT_CONTAINER_SECTION_SETTINGS.direction,
			},
			items: [newSection1.id, newSection2.id],
		}

		return {
			...state,
			items: [
				...state.items.filter(section => section.id !== id),
				newContainer,
				newSection1,
				newSection2,
			],
		}
	})
	.case(updateSectionSettings, (state, { id, settings }) => ({
		...state,
		items: state.items.map(section => section.id === id
			? {
				...section,
				settings: {
					...section.settings,
					...settings,
				},
			} as typeof section
			: section,
		),
	}))
	.case(switchEditMode, (state, editMode) => ({
		...state,
		editMode,
	}))
	.case(setEditingSection, (state, id) => {
		if (!id) return {
			...state,
			editingItem: null,
		}

		const section = state.items.find(section => section.id === id)

		if (!section) return state

		return {
			...state,
			editingItem: section,
		}
	})
	.case(updateSectionItem, (state, item) => {
		const section = state.items.find(section => section.id === item.id)

		if (!section) return state

		return {
			...state,
			items: state.items.map(section => section.id === item.id
				? item
				: section,
			),
		}
	})
	.case(updateSectionType, (state, { id, type }) => {
		const settings = defaultSectionSettings[type]

		return {
			...state,
			items: state.items.map(section => section.id === id
				? {
					id: section.id,
					type,
					settings
				} as SectionItem
				: section,
			),
		}
	})
	.case(setSectionItems, (state, { id, items }) => ({
		...state,
		items: state.items.map(section => section.id === id
			? {
				...section,
				items: items as typeof section['items'],
			} as typeof section
			: section,
		),
	}))
	.case(switchSectionItemPin, (state, { id, itemId, pinned: pinnedState }) => {
		const section = state.items.find(section => section.id === id) as SectionItemHistory | SectionItemVCS | SectionItemITS

		if (!section) return state

		let items: typeof section.items
		let pinned: typeof section.pinned

		if (pinnedState) {
			[pinned, items] = movePinnedItemBetweenArrays(section.pinned, section.items, itemId)
		} else {
			[items, pinned] = movePinnedItemBetweenArrays(section.items, section.pinned, itemId)
		}

		return {
			...state,
			items: state.items.map(section => section.id === id
				? { ...section, pinned, items } as unknown as typeof section
				: section,
			),
		}
	})
	.case(updatePinnedItems, (state, { id, items }) => {
		const section = state.items.find(section => section.id === id) as SectionItemHistory | SectionItemVCS | SectionItemITS

		if (!section) return state

		const pinned = [...(section.pinned ?? [])]
			.map(item => {
				const updated = items.find(updated => updated.id === item.id)

				if (updated) {
					return {
						...item,
						...updated,
					} as typeof item
				}

				return item
			})

		return {
			...state,
			items: state.items.map(section => section.id === id
				? { ...section, pinned } as unknown as typeof section
				: section,
			),
		}
	})
	.case(setEditingItem, (state, bookmark) => ({
		...state,
		items: state.items.map(section => section.type === 'bookmarks'
			? {
				...section,
				editingItem: bookmark,
			} as typeof section
			: section,
		),
	}))

export default createReducer
