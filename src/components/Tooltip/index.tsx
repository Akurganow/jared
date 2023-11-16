import cn from 'classnames'
import {
	HTMLAttributes,
	JSX,
	useEffect,
	useState,
	forwardRef,
	useMemo,
	CSSProperties,
	useCallback,
	useRef
} from 'react'
import { createPortal } from 'react-dom'
import { isFunction } from '@plq/is'
import st from './styles.module.css'

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
	body: null | string | JSX.Element | (() => JSX.Element | string | null)
	direction?: 'left' | 'right' | 'top' | 'bottom'
	visible?: boolean
}

const defaultDirection = 'right'
export default forwardRef<HTMLButtonElement, TooltipProps>(({
	body,
	children,
	visible,
	className,
	direction = defaultDirection,
	...props
},
ref) => {
	const container = useMemo<HTMLDivElement>(() => document.getElementById('tooltip') as HTMLDivElement, [])
	const tooltipRef = useRef<HTMLDivElement>(null)
	const [isVisible, setVisible] = useState(Boolean(visible))
	const [storedDirection, setDirection] = useState(direction)
	const [rect, setRect] = useState<DOMRect | null>(null)
	const tooltipStyle = useMemo(() => {
		if (!rect) return {}

		const { width, height } = rect
		const { left, top } = rect

		const style: CSSProperties = {}

		switch (storedDirection) {
		case 'left':
			style.left = left - width
			style.top = top + height / 2
			break
		case 'right':
			style.left = left + width
			style.top = top + height / 2
			break
		case 'top':
			style.left = left + width / 2
			style.top = top - height
			break
		case 'bottom':
			style.left = left + width / 2
			style.top = top + height
			break
		}

		return style
	}, [storedDirection, rect])

	const element = useMemo(() => {
		return (
			<div ref={tooltipRef} style={tooltipStyle} className={cn(st.tooltip, st[storedDirection], { [st.visible]: isVisible })}>
				{isFunction(body) ? body() : body}
			</div>
		)
	}, [tooltipStyle, storedDirection, isVisible, body])

	useEffect(() => {
		if (!rect) return

		const { width, height, left, top } = rect
		const { innerWidth, innerHeight } = window
		if (left + width > innerWidth) {
			setDirection('left')
		} else if (left < 0) {
			setDirection('right')
		} else if (top + height > innerHeight) {
			setDirection('top')
		} else if (top < 0) {
			setDirection('bottom')
		}
	}, [rect])

	let hideTooltipTimeout: NodeJS.Timeout | null = null

	const handleMouseEnter = useCallback(() => requestAnimationFrame(() => {
		if (hideTooltipTimeout) {
			clearTimeout(hideTooltipTimeout)
			// eslint-disable-next-line react-hooks/exhaustive-deps
			hideTooltipTimeout = null
		}
		setVisible(true)

		return () => {
			if (hideTooltipTimeout) {
				clearTimeout(hideTooltipTimeout)
				hideTooltipTimeout = null
			}
		}
	}), [])

	const handleMouseLeave = useCallback(() => requestAnimationFrame(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
		hideTooltipTimeout = setTimeout(() => {
			setVisible(false)
			hideTooltipTimeout = null
		}, 1000)

		return () => {
			if (hideTooltipTimeout) {
				clearTimeout(hideTooltipTimeout)
				hideTooltipTimeout = null
			}
		}
	}), [])

	useEffect(() => {
		const child = ref && 'current' in ref && ref.current as HTMLButtonElement | null
		const tooltip = tooltipRef.current

		if (child) {
			const rect = child.getBoundingClientRect()

			setRect(rect)
			child.addEventListener('mouseenter', handleMouseEnter)
			child.addEventListener('mouseleave', handleMouseLeave)
		}

		if (tooltip) {
			tooltip.addEventListener('mouseenter', handleMouseEnter)
			tooltip.addEventListener('mouseleave', handleMouseLeave)
		}

		return () => {
			if (child) {
				child.removeEventListener('mouseenter', handleMouseEnter)
				child.removeEventListener('mouseleave', handleMouseLeave)
			}

			if (tooltip) {
				tooltip.removeEventListener('mouseenter', handleMouseEnter)
				tooltip.removeEventListener('mouseleave', handleMouseLeave)
			}
		}
	}, [handleMouseEnter, handleMouseLeave, ref])

	const portal =	createPortal(element, container)

	return (
		<>
			{portal}
			<div className={cn(st.container, className)} {...props}>
				{children}
			</div>
		</>
	)
})
