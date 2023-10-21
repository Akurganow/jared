import {
	BookmarksSectionSettings,
	HistorySectionSettings,
	ITSSectionSettings, SectionItem,
	VCSSectionSettings
} from 'types/sections'
import { ProcessorConfigType } from 'types/history'
import type { SectionsState, ContainerSectionSettings } from 'types/sections'

export const storeKey = 'sections'

export const DEFAULT_CONTAINER_SECTION_SETTINGS: ContainerSectionSettings = {
	direction: {
		type: 'option',
		value: 'row',
		options: ['row', 'column'],
		hint: 'Direction of the container',
	}
}
const defaultHistorySectionSettings = {
	maxResults: {
		type: 'number',
		value: 100,
		hint: 'Maximum number of results to show',
	} as HistorySectionSettings['maxResults'],
	numDays: {
		type: 'number',
		value: 7,
		hint: 'Number of days to search history',
	} as HistorySectionSettings['numDays'],
}
export const DEFAULT_HISTORY_SECTION_SETTINGS: HistorySectionSettings = {
	...defaultHistorySectionSettings,
	query: {
		type: 'text',
		value: 'google, reddit.com/r/dev, https://web.dev',
		hint: 'Comma separated history search queries',
	},
	exclude: {
		type: 'text',
		value: 'gitlab, github, jira, youtrack',
		hint: 'Comma separated history search queries',
	}
}
export const DEFAULT_VCS_SECTION_SETTINGS: VCSSectionSettings = {
	...defaultHistorySectionSettings,
	gitlab: {
		type: 'disabled',
		value: [] as ProcessorConfigType['name'][],
	},
	github: {
		type: 'disabled',
		value: [] as ProcessorConfigType['name'][],
	},
	query: {
		type: 'text',
		value: 'https://gitlab.com gitlab\nhttps://github.com github',
	},
	exclude: {
		type: 'text',
		value: '',
	}
}
export const DEFAULT_ITS_SECTION_SETTINGS: ITSSectionSettings = {
	...defaultHistorySectionSettings,
	jira: {
		type: 'disabled',
		value: [] as ProcessorConfigType['name'][],
	},
	youtrack: {
		type: 'disabled',
		value: [] as ProcessorConfigType['name'][],
	},
	query: {
		type: 'text',
		value: 'https://jira.atlassian.com/ jira\nhttps://youtrack.jetbrains.com/ youtrack',
	},
	exclude: {
		type: 'text',
		value: '',
	}
}
export const DEFAULT_BOOKMARKS_SECTION_SETTINGS: BookmarksSectionSettings = {
	saveToBrowser: {
		type: 'boolean',
		value: true,
	},
	browserKey: {
		type: 'string',
		value: 'Jared',
	},
	browserId: {
		type: 'string',
		value: '',
	}
}

export const defaultSectionSettings = {
	container: DEFAULT_CONTAINER_SECTION_SETTINGS,
	history: DEFAULT_HISTORY_SECTION_SETTINGS,
	vcs: DEFAULT_VCS_SECTION_SETTINGS,
	its: DEFAULT_ITS_SECTION_SETTINGS,
	bookmarks: DEFAULT_BOOKMARKS_SECTION_SETTINGS,
}

export const sectionTypes = Object.keys(defaultSectionSettings) as SectionItem['type'][]

export const initialState: SectionsState = {
	editingItem: null,
	editMode: false,
	providers: {
		vcs: ['gitlab', 'github'],
		its: ['jira', 'youtrack'],
	},
	items: [
		{
			id: '1',
			type: 'container',
			settings: { ...DEFAULT_CONTAINER_SECTION_SETTINGS },
			items: ['2', '3', '4'],
		},
		{
			id: '2',
			type: 'its',
			settings: { ...DEFAULT_ITS_SECTION_SETTINGS, },
			items: [],
			pinned: [],
		},
		{
			id: '3',
			type: 'container',
			settings: {
				...DEFAULT_CONTAINER_SECTION_SETTINGS,
				direction: {
					...DEFAULT_CONTAINER_SECTION_SETTINGS.direction,
					value: 'column',
				}
			},
			items: ['5', '6'],
		},
		{
			id: '4',
			type: 'vcs',
			settings: { ...DEFAULT_VCS_SECTION_SETTINGS },
			items: [],
			pinned: [],
		},
		{
			id: '5',
			type: 'history',
			settings: { ...DEFAULT_HISTORY_SECTION_SETTINGS },
			items: [],
			pinned: [],
		},
		{
			id: '6',
			type: 'bookmarks',
			settings: { ...DEFAULT_BOOKMARKS_SECTION_SETTINGS },
			items: [],
		},
	]
}
