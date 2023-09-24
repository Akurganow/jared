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
	const [
		contentSize,
		setContentSize,
	] = useState<{ width: number, height: number }>()
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
		const childrenRects = children.map(child => child.getBoundingClientRect())
		const childrenMaxHeight = Math.max.apply(null, childrenRects.map(rect => rect.height))
		const childrenMaxWidth = Math.max.apply(null, childrenRects.map(rect => rect.width))
		const childrenHeight = Math.ceil(childrenMaxHeight)
		const childrenWidth = Math.ceil(childrenMaxWidth)

		console.log('boundiWidth', childrenRects.map(rect => rect.width))
		console.log('boundiHeight', childrenRects.map(rect => rect.height))

		setContentSize({
			width: childrenWidth,
			height: childrenHeight,
		})
	}, [contentRef])

	return (
		<>
			<style>{
				contentSize
					? `
					.${st.content} {
					--tab-content-height: min(${contentSize.height}px, 50vh);
					--tab-content-width: min(${contentSize.width}px, 75vw);
					}`
					: ''
			}</style>
			<div {...props} className={st.container} data-testid="Tabs">
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
								title={typeof title === 'string' ? title : undefined}
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
							[st.preflight]: !contentSize,
						})

						return (
							<div
								key={index}
								className={classNames}
								data-testid={isActive ? 'Tabs:ContentItem' : undefined}
								data-index={index}
								tabIndex={isActive ? 0 : -1}
							>
								{(!contentSize || isActive) && children}
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}
