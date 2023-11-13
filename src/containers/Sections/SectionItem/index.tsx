import cn from 'classnames'
import { useDispatch } from 'react-redux'
import Icon from 'components/SVGIcon'
import { openDialog } from 'store/actions/dialogs'
import { setEditingSection, splitSection } from 'store/actions/sections'
import st from './styles.module.css'
import type { CSSProperties, HTMLAttributes } from 'react'

interface SectionItemProps extends HTMLAttributes<HTMLDivElement> {
	id: string
	isLoading?: boolean
	withTitle?: boolean
	type?: string
	title?: string
	sectionClassName?: string
	sectionStyle?: CSSProperties
}

export default function SectionItem({ id, type, title, withTitle, children, className, sectionClassName, style, sectionStyle, isLoading }: SectionItemProps) {
	const dispatch = useDispatch()
	const openSettings = () => {
		dispatch(setEditingSection(id))
		dispatch(openDialog('section'))
	}

	const handleSplit = () => {
		dispatch(splitSection(id))
	}

	return <>
		<section
			className={cn(st.section, sectionClassName, { [st.withTitle]: withTitle })}
			style={sectionStyle}
		>
			{isLoading && <div className={st.loader} />}
			{withTitle && <h2 className={st.title}>
				{title || ''}

				<div className={st.actions}>
					{type !== 'container' && <button className={st.item} onClick={handleSplit} title="Split container">
						<Icon name="divide" className={st.icon} />
					</button>}
					<button className={st.item} onClick={openSettings} title="Container settings">
						<Icon name="settings" className={st.icon}/>
					</button>
				</div>
			</h2>}

			<div className={cn(st.content, className)} style={style}>
				{children}
			</div>
		</section>
	</>
}
