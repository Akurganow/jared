import cn from 'classnames'
import SVGIcon from 'components/SVGIcon'
import st from './styles.module.css'
import { VSCItemProps } from './types'
export default function ({ id, type, url, title, repoName, provider }: VSCItemProps) {
	return (
		<a
			key={id}
			title={title}
			href={url.href}
			className={cn(st.item, st[type])}
		>
			<div>
				{type} {repoName}
			</div>
			{title}
			{
				provider !== 'unknown'
					? <SVGIcon name={`${provider}Logo`} className={st.icon}/>
					: null
			}
		</a>
	)
}
