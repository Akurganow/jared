import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { MouseEvent } from 'react'
import SVGIcon from 'components/SVGIcon'
import PinButton from 'components/PinButton'
import { pinItem, unpinItem } from 'store/actions/history'
import st from './styles.module.css'
import { VSCItemProps } from './types'
export default function ({ id, type, url, title, name, provider, pinned }: VSCItemProps) {
	const dispatch = useDispatch()
	const handlePinClick = (event: MouseEvent) => {
		event.preventDefault()
		event.stopPropagation()

		const action = pinned ? unpinItem(id) : pinItem(id)
		dispatch(action)
	}

	return (
		<a
			key={id}
			title={title}
			href={url}
			className={cn(st.item, st[type])}
			data-at={id}
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
			<PinButton pinned={pinned} className={st.pinButton} onClick={handlePinClick}/>
		</a>
	)
}
