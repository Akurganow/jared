import cn from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
import st from './styles.module.css'
import type { HTMLAttributes, ReactNode } from 'react'

interface Tab {
	title: string | ReactNode
	disabled?: boolean
	children?: TabsProps['children']
}

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
	items: Tab[]
}

export default function Tabs({ items, ...props }: TabsProps) {
	const contentRef = useRef<HTMLDivElement>(null)
	const [contentHeight, setContentHeight] = useState<number>()
	const [activeTab, setActiveTab] = useState(0)
	const isTabActive = useCallback((index: number) => {
		return index === activeTab
	}, [activeTab])

	const handleTabSwitch = useCallback((index: number) => () => {
		setActiveTab(index)
	}, [])

	useEffect(() => {
		const content = contentRef.current

		if (!content) return

		const children = Array.from(content.children)
		const childrenHeights = children.map(child => child.getBoundingClientRect().height)
		const childrenMaxHeight = Math.max.apply(null, childrenHeights)
		const childrenHeight = Math.ceil(childrenMaxHeight)

		setContentHeight(childrenHeight)
	}, [contentRef])

	return (
		<div {...props} className={st.container} data-testid="Tabs">
			<style>{
				contentHeight
					? `.${st.content} { --tab-content-height: min(${contentHeight}px, 50vh); }`
					: ''
			}</style>
			<div className={st.header}>
				{items.map((item, index) => {
					const { title, disabled } = item
					const classNames = cn(st.headerItem, {
						[st.active]: isTabActive(index),
					})
					return (
						<button
							key={index}
							className={classNames}
							onClick={disabled ? undefined : handleTabSwitch(index)}
							disabled={disabled}
							data-testid="Tabs:Item"
							tabIndex={0}
						>
							{title}
						</button>
					)
				})}
			</div>

			<div
				className={st.content}
				data-testid="Tabs:Content"
				ref={contentRef}
			>
				{items.map((item, index) => {
					const { children } = item
					const isActive = isTabActive(index)
					const classNames = cn(st.contentItem, {
						[st.active]: isActive,
					})

					return (
						<div
							key={index}
							className={classNames}
							data-testid={isActive ? 'Tabs:ContentItem' : undefined}
							data-index={index}
							tabIndex={isActive ? 0 : -1}
						>
							{(!contentHeight || isActive) && children}
						</div>
					)
				})}
			</div>
		</div>
	)
}
