import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { MouseEvent } from 'react'
import { selectedUserContentItems } from 'store/selectors/history'
import Favicon from 'components/Favicon'
import PinButton from 'components/PinButton'
import { pinItem, unpinItem } from 'store/actions/history'
import st from './styles.module.css'

export default function () {
	const dispatch = useDispatch()
	const history = useSelector(selectedUserContentItems)

	const handlePinClick = ({ id, pinned }: { id: string, pinned?: boolean }) => (event: MouseEvent) => {
		event.preventDefault()
		event.stopPropagation()

		const action = pinned ? unpinItem(id) : pinItem(id)
		dispatch(action)
	}

	return (
		<div className={cn(st.content)}>
			{history.map(({ id, title, url, pinned }) => (
				<div
					key={id + title}
					className={cn(st.item)}
					title={title}
				>
					<a href={url} className={st.link}>
						{url && <Favicon href={url} size={16} />} {title}
					</a>
					<PinButton
						className={st.pinButton}
						pinned={pinned}
						onClick={handlePinClick({ id, pinned })}
					/>
				</div>
			))}
		</div>
	)
}
