import cn from 'classnames'
import { useSelector } from 'react-redux'
import { selectedUserContentItems } from 'store/selectors/history'
import Favicon from 'components/Favicon'
import st from './styles.module.css'

export default function () {
	const history = useSelector(selectedUserContentItems)

	return (
		<div className={cn(st.content)}>
			{history.map((item) => (
				<div
					key={item.id}
					className={cn(st.item)}
					title={item.title}
				>
					<a href={item.url} className={st.link}>
						{item.url && <Favicon href={item.url} size={16} />} {item.title}
					</a>
				</div>
			))}
		</div>
	)
}
