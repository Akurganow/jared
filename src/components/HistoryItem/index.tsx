import cn from 'classnames'
import PinButton from 'components/PinButton'
import st from './styles.module.css'
import type { MouseEvent } from 'react'
import type { HistoryItem, ITSProviderType, ITSType, VCSProviderType, VCSType } from 'types/history'

interface HistoryItemProps extends HistoryItem {
	type: VCSType | ITSType
	provider: 'unknown' | VCSProviderType | ITSProviderType
	switchPin: (id: string, pinned: boolean) => void
	pinned: boolean
}

type TypeTokens = 'unknown' | 'item' | 'filter' | 'person' | 'preferences' | 'file'
const typesMap: Record<VCSType | ITSType, TypeTokens> = {
	unknown: 'unknown',
	issue: 'item',
	commit: 'file',
	repository: 'file',
	pullRequest: 'item',
	mergeRequest: 'item',
	filter: 'filter',
	board: 'filter',
	topics: 'filter',
	job: 'filter',
	pipeline: 'filter',
	profile: 'person',
	settings: 'preferences',
	blob: 'file',
	tree: 'file',
	project: 'preferences',
}

export default function HistoryItem({ id, title, name, url, type, pinned, switchPin }: HistoryItemProps) {
	const handlePinClick = (event: MouseEvent) => {
		event.preventDefault()
		event.stopPropagation()

		switchPin(id, pinned)
	}
	const currentType = typesMap[type]

	return <a
		key={id}
		title={title}
		href={url}
		className={cn(st.item, st[currentType])}
		data-testid="HistoryItem"
	>
		<div className={st.name} data-testid="HistoryItem:name">
			{name}
		</div>
		{title}
		<PinButton
			data-testid="HistoryItem:PinButton"
			title={pinned ? 'Unpin' : 'Pin'}
			pinned={pinned}
			className={st.pinButton}
			onClick={handlePinClick}
		/>
	</a>
}
