import { useSelector } from 'react-redux'
import cn from 'classnames'
import VCSSection from 'containers/Sections/VCSSection'
import ITSSection from 'containers/Sections/ITSSection'
import HistorySection from 'containers/Sections/HistorySection'
import BookmarksSection from 'containers/Sections/BookmarksSection'
import { selectedEditMode, selectedSection } from 'store/selectors/sections'
import SectionItem from 'containers/Sections/SectionItem'
import st from './styles.module.css'
import type { SectionProps } from 'containers/Sections/types'
import type { SectionItemContainer } from 'types/sections'

export default function Section({ id, className, style, ...props }: SectionProps) {
	const section = useSelector(selectedSection(id))
	const editMode = useSelector(selectedEditMode)
	const isInitial = id === '1'

	if (!section) return null

	const { type } = section

	switch (type) {
	case 'container': {
		const { items, settings } = section as SectionItemContainer
		const { direction } = settings
		const directionValue = direction.value as 'row' | 'column'
		const itemWidth = directionValue === 'row' ? `${(100 / items.length)}%` : undefined
		const itemHeight = directionValue === 'column' ? `${100 / items.length}%` : undefined
		const itemStyle = {
			width: itemWidth,
			maxWidth: itemWidth,
			height: itemHeight,
			maxHeight: itemHeight,
		}

		return <SectionItem
			{...props}
			id={id}
			type={section.type}
			title={type}
			withTitle={editMode}
			className={cn(st.container, className, { [st.initial]: isInitial })}
			sectionStyle={style}
			style={{
				flexDirection: direction.value as 'row' | 'column',
			}}
		>
			{items.map(item => <Section
				id={item}
				key={item}
				style={itemStyle}
			/>)}
		</SectionItem>
	}
	case 'vcs': {
		return (
			<VCSSection
				{...props}
				withTitle={editMode}
				id={id}
				sectionStyle={style}
				sectionClassName={className}
			/>
		)
	}
	case 'its': {
		return (
			<ITSSection
				{...props}
				withTitle={editMode}
				id={id}
				sectionStyle={style}
				sectionClassName={className}
			/>
		)
	}
	case 'history': {
		return (
			<HistorySection
				{...props}
				withTitle={editMode}
				id={id}
				sectionStyle={style}
				sectionClassName={className}
			/>
		)
	}
	case 'bookmarks': {
		return (
			<BookmarksSection
				{...props}
				withTitle={editMode}
				id={id}
				sectionStyle={style}
				sectionClassName={className}
			/>
		)
	}
	default:
		return null
	}
}
