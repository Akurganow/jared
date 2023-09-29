import cn from 'classnames'
import { useSelector } from 'react-redux'
import { selectedVCS } from 'store/selectors/history'
import HistoryItemList from 'components/HistoryItemList'
import st from './styles.module.css'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type VSCProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export default function ({ className, ...props }: VSCProps) {
	const vcsHistory = useSelector(selectedVCS)

	return <HistoryItemList
		{...props}
		className={cn(st.vcs, className)}
		items={vcsHistory}
	/>
}
