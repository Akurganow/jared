import cn from 'classnames'
import { MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { HistoryItem, ITSProviderType, ITSType, VCSProviderType, VCSType } from 'types/history'
import SVGIcon from 'components/SVGIcon'
import PinButton from 'components/PinButton'
import { pinItem, unpinItem } from 'store/actions/history'
import st from './styles.module.css'

interface HistoryItemProps extends HistoryItem {
	type: VCSType | ITSType
	provider: 'unknown' | VCSProviderType | ITSProviderType
}

type TypeTokens = 'unknown' | 'item' | 'filter' | 'person' | 'preferences' | 'file'
const typesMap: Record<VCSType | ITSType, TypeTokens> = {
	unknown: 'unknown',
	issue: 'item',
	commit: 'item',
	repo: 'item',
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

export default function HistoryItem({ id, title, name, url, type, provider, pinned }: HistoryItemProps) {
	const dispatch = useDispatch()
	const handlePinClick = (event: MouseEvent) => {
		event.preventDefault()
		event.stopPropagation()

		const action = pinned ? unpinItem(id) : pinItem(id)
		dispatch(action)
	}
	const currentType = typesMap[type]

	return <a
		key={id}
		title={title}
		href={url}
		className={cn(st.item, st[currentType])}
		data-testid="HistoryItem"
	>
		<div>
			{type} {name}
		</div>
		{title}
		{
			provider !== 'unknown'
				? <SVGIcon name={`${provider}Logo`} className={st.icon}/>
				: null
		}
		<PinButton
			data-testid="HistoryItem:PinButton"
			pinned={pinned}
			className={st.pinButton}
			onClick={handlePinClick}
		/>
	</a>
}
