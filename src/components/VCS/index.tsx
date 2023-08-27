import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'
import { selectedGitItems } from 'store/history'
import st from './styles.module.css'
import Item from './components/Item'

interface RepoProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

export default function ({ className, ...props }: RepoProps) {
	const history = useSelector(selectedGitItems)

	return (
		<div
			className={cn(st.repo, className)}
			{...props}
		>
			{history.map((item) => (
				<Item
					key={item.id}
					id={item.id}
					type={item.type}
					url={item.url}
					title={item.title}
					repoName={item.name}
					gitType={item.provider}
				/>
			))}
		</div>
	)
}
