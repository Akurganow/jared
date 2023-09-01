import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { MouseEvent } from 'react'
import SVGIcon from 'components/SVGIcon'
import { pinItem, unpinItem } from 'store/history'
import PinButton from 'components/PinButton'
import st from './styles.module.css'
import { ITSItemProps } from './types'

export default function ({ id, title, url, type, provider, pinned }: ITSItemProps) {
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
			href={url.href}
			className={cn(st.item, st[type])}
			data-at={id}
		>
			<div>
				{type}
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
