import { createSelector } from 'reselect'
import { storeKey } from 'store/constants/sections'
import type { RootState } from 'store/types'
import type { SectionsState, SectionItemContainer } from 'types/sections'

const rawSelectedSections = (state: RootState) => state[storeKey]

export const selectedEditMode = createSelector(
	rawSelectedSections,
	(sections) => sections.editMode
)

export const selectedEditingItem = createSelector(
	rawSelectedSections,
	(sections) => sections.editingItem
)

export const selectedSections = createSelector(
	rawSelectedSections,
	(sections) => sections.items
)

export const selectedContainers = createSelector(
	selectedSections,
	(sections): SectionItemContainer[] =>
		sections
			.filter(section =>
				section.type === 'container'
			) as SectionItemContainer[]
)

export const selectedSection = (id: string) =>
	(state: SectionsState) => createSelector(
		[
			selectedSections,
			(_state, id) => id,
		],
		(sections, id) => sections.find(section => section.id === id)

	)(state, id)

export const selectedSectionParent = (id: string) =>
	(state: SectionsState) => createSelector(
		[
			selectedContainers,
			(_state, id) => id,
		],
		(sections, id) =>
			sections
				.find(section => section.items.includes(id))

	)(state, id)

export const selectedVCSProviders = createSelector(
	rawSelectedSections,
	processing => processing.providers.vcs,
)

export const selectedITSProviders = createSelector(
	rawSelectedSections,
	processing => processing.providers.its,
)
