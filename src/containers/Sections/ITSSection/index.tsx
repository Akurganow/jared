import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useAsyncEffect } from 'use-async-effect'
import { selectedSection } from 'store/selectors/sections'
import SectionItem from 'containers/Sections/SectionItem'
import HistoryItemList from 'components/HistoryItemList'
import { ITSHistoryItem, ITSProviderType } from 'types/history'
import APIConstructor from 'utils/api'
import { jiraProcessConfig } from 'utils/history/its/jira'
import { youtrackProcessConfig } from 'utils/history/its/youtrack'
import { setSectionItems, switchSectionItemPin } from 'store/actions/sections'
import { filterBySameId, filterBySameTitle } from 'utils/array'
import type { SectionItemITS } from 'types/sections'
import type { SectionProps } from 'containers/Sections/types'

const API = new APIConstructor()
const configs = {
	jira: jiraProcessConfig,
	youtrack: youtrackProcessConfig,
}

export default function ITSSection({ id, withTitle, ...props }: SectionProps) {
	const dispatch = useDispatch()
	const section = useSelector(selectedSection(id)) as SectionItemITS
	const [isLoading, setIsLoading] = useState(false)
	const { query, exclude, numDays, maxResults: { value: maxResults } } = section.settings
	const startTime = new Date().getTime() - 1000 * 60 * 60 * 24 * numDays.value

	const handleSwitchPin = (itemId: string, pinned: boolean) => {
		dispatch(switchSectionItemPin({ id, itemId, pinned }))
	}

	useAsyncEffect(async () => {
		setIsLoading(true)
		const excludeItems = (await Promise.all(exclude.value
			.split(',')
			.filter(Boolean)
			.map(async (query) => await API.history.getItems({
				text: query,
				maxResults: maxResults * 2,
				startTime,
			}))
		)).flat()
		const items = (await Promise.all(query.value
			.split('\n')
			.filter(Boolean)
			.map(async (line) => {
				const [query, provider] = line.trim().split(' ')
				const config = configs[provider as keyof typeof configs]
					.filter(([,, type]) => !section.settings[provider as ITSProviderType].value.includes(type.name))

				return await API.history.getProcessedItems<ITSHistoryItem>({
					text: query,
					maxResults: maxResults * 2,
					startTime,
					...(!config ? { error: new Error(`Unknown type: ${provider}`) } : {})
				}, config)
			})))
			.flat()
			.filter(item => !excludeItems.find(excludeItem => excludeItem.id === item.id || excludeItem.title === item.title))

		dispatch(setSectionItems({ id, items }))
		setIsLoading(false)
	}, [section.settings.query.value, section.settings.maxResults.value])

	if (!section) return null

	const pinned = [...(section.pinned ?? [])]
	const items = [...(section.items) ?? []]
		.filter(item =>
			!pinned.find(pinnedItem => pinnedItem.id === item.id || pinnedItem.title === item.title)
		)
		.filter(filterBySameId)
		.filter(filterBySameTitle)
		.slice(0, maxResults)

	return <SectionItem
		{...props}
		id={id}
		type={section.type}
		isLoading={isLoading}
		withTitle={withTitle}
		title={section.type}
	>
		<HistoryItemList items={items} pinned={pinned} switchPin={handleSwitchPin} />
	</SectionItem>
}
