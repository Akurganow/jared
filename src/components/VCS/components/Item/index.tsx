import cn from 'classnames'
import SVGIcon from 'components/SVGIcon'
import st from './styles.module.css'
import { GitItemProps } from './types'
export default function ({ id, type, url, title, repoName, gitType }: GitItemProps) {
	const gitTypeIcon = gitType === 'github' || gitType === 'gitlab'
		? gitType
		:  'git'

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
			<SVGIcon name={gitTypeIcon} className={st.icon}/>
		</a>
	)
}
