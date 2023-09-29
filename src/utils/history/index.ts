import memoize from 'lodash/memoize'
import { gitlabProcessConfig as gitlab } from 'utils/history/vcs/gitlab'
import { githubProcessConfig as github } from 'utils/history/vcs/github'
import { jiraProcessConfig as jira } from 'utils/history/its/jira'
import { youtrackProcessConfig as youtrack } from 'utils/history/its/youtrack'
import type { ProcessorConfigType } from 'types/history'

const processorTypes = {
	jira,
	youtrack,
	github,
	gitlab,
}

export type ProcessorType = keyof typeof processorTypes
export type ProcessorItemTypes = typeof processorTypes[ProcessorType][number][1]
export type ProcessorReturnType = ReturnType<ProcessorItemTypes>
export type ProcessorCreatorType = (item: chrome.history.HistoryItem) => ProcessorReturnType
export type DisabledProcessors = ProcessorConfigType['name'][]

export function createHistoryItemProcessor(type: ProcessorType): ProcessorCreatorType {
	const processor = processorTypes[type]

	return function (item: chrome.history.HistoryItem): ProcessorReturnType {
		const index = processor.findIndex(([condition]) => condition(item))
		const [, process] = processor[index]

		return process(item)
	}
}

function rawGetHistoryItemProcessorTypes(type: ProcessorType) {
	const processor = processorTypes[type]

	return processor.map(([, , type]) => type)
}

export const getHistoryItemProcessorTypes = memoize(rawGetHistoryItemProcessorTypes)
