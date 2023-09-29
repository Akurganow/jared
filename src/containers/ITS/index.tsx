import cn from 'classnames'
import { useSelector } from 'react-redux'
import { selectedITS } from 'store/selectors/history'
import HistoryItemList from 'components/HistoryItemList'
import st from './styles.module.css'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type ITSProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export default function ({ className, ...props }: ITSProps) {
	const itsHistory = useSelector(selectedITS)

	return <HistoryItemList
		{...props}
		className={cn(st.its, className)}
		items={itsHistory}
	/>
}
