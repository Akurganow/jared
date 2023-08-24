import cn from 'classnames'
import { Text } from 'dracula-ui'
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
			<div className="drac-line-height-xs">
				<Text size="xs">{type} {repoName}</Text>
			</div>
			<Text size="sm">{title}</Text>
			<SVGIcon name={gitTypeIcon} className={st.icon}/>
		</a>
	)
}
