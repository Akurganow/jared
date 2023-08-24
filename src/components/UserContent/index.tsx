import cn from 'classnames'
import { useSelector } from 'react-redux'
import { Text } from 'dracula-ui'
import { selectedMainItems } from 'store/history'
import st from './styles.module.css'

export default function () {
	const history = useSelector(selectedMainItems)

	return (
		<div className={cn(st.content)}>
			{history.map((item) => (
				<div
					key={item.id}
					className={cn(st.item)}
					title={item.title}
				>
					<a href={item.url}>
						<Text size="md">{item.title}</Text>
					</a>
				</div>
			))}
		</div>
	)
}
