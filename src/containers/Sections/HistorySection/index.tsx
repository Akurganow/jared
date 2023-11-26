import { useDispatch, useSelector } from 'react-redux'
import { MouseEvent, useCallback, useState } from 'react'
import cn from 'classnames'
import { useAsyncEffect } from 'use-async-effect'
import { uniqBy } from 'lodash'
import { selectedSection } from 'store/selectors/sections'
import Favicon from 'components/Favicon'
import PinButton from 'components/PinButton'
import SectionItem from 'containers/Sections/SectionItem'
import { setSectionItems, switchSectionItemPin, updatePinnedItems } from 'store/actions/sections'
import APIConstructor from 'utils/api'
import { filterBySameId } from 'utils/array'
import st from './styles.module.css'
import type { SectionItemHistory } from 'types/sections'
import type { SectionProps } from 'containers/Sections/types'

const API = new APIConstructor()

export default function HistorySection({ id, withTitle, className, ...props }: SectionProps) {
	const dispatch = useDispatch()
	const section = useSelector(selectedSection(id)) as SectionItemHistory
	const [isLoading, setIsLoading] = useState(false)
	const { query, exclude, numDays, maxResults: { value: maxResults } } = section.settings
	const startTime = new Date().getTime() - 1000 * 60 * 60 * 24 * numDays.value

	const handlePinClick = useCallback(({ itemId, pinned }: { itemId: string, pinned: boolean }) => (event: MouseEvent) => {
		event.preventDefault()
		event.stopPropagation()

		const action = switchSectionItemPin({ id, itemId, pinned })
		dispatch(action)
	}, [dispatch, id])

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
		const items = uniqBy(
			(await Promise.all(query.value
				.split(',')
				.filter(Boolean)
				.map(async (query) => {

					return await API.history.getItems({
						text: query,
						maxResults: maxResults * 2,
						startTime,
					})
				})))
				.flat()
				.filter(item => !excludeItems.find(excludeItem => excludeItem.id === item.id)),
			'title')

		dispatch(setSectionItems({ id, items }))
		dispatch(updatePinnedItems({ id, items }))
		setIsLoading(false)
	}, [section.settings.query.value, section.settings.maxResults.value])


	if (!section) return null

	const pinned = [...(section.pinned ?? [])]
	const items = [...(section.items) ?? []]
		.filter(item =>
			!pinned.find(pinnedItem => pinnedItem.id === item.id)
		)
		.filter(filterBySameId)
		.slice(0, maxResults)

	return <SectionItem
		{...props}
		id={id}
		type={section.type}
		withTitle={withTitle}
		isLoading={isLoading}
		title={section.type}
		className={cn(st.content, className)}
	>
		{pinned.map(({ id: itemId, title, url }) => (
			<a
				href={url}
				key={itemId + title}
				className={cn(st.item)}
				title={title}
			>
				{url && <Favicon href={url} size={16} />}
				<div className={st.text}>{title}</div>
				<PinButton
					className={st.pinButton}
					pinned={true}
					onClick={handlePinClick({ itemId, pinned: true })}
				/>
			</a>
		))}
		{items.map(({ id: itemId, title, url }) => (
			<a
				href={url}
				key={itemId + title}
				className={cn(st.item)}
				title={title}
			>
				{url && <Favicon href={url} size={16} />}
				<div className={st.text}>{title}</div>
				<PinButton
					className={st.pinButton}
					pinned={false}
					onClick={handlePinClick({ itemId, pinned: false })}
				/>
			</a>
		))}
	</SectionItem>
}
