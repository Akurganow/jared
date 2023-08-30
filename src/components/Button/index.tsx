import React, { DetailedHTMLProps, useCallback, MouseEvent as ReactMouseEvent, MouseEventHandler, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import cn from 'classnames'
import st from './styles.module.css'

interface HTMLButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    isLink?: false
}
interface HTMLAnchorProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    isLink: true
    disabled?: boolean
}

type ButtonProps = HTMLButtonProps | HTMLAnchorProps

const Button: React.FC<ButtonProps> = ({ className, onClick, disabled, isLink, ...props }) => {
	const handleLinkClick = useCallback((event: ReactMouseEvent<HTMLAnchorElement>) => {
		if (disabled) {
			event.preventDefault()
			event.stopPropagation()
		} else if (onClick) {
			(onClick as MouseEventHandler)(event)
		}
	}, [disabled])
	const classNames = cn(st.button, className)

	if (isLink) {
		return <a
			className={classNames}
			onClick={handleLinkClick}
			{...(props as HTMLAnchorProps)}
		/>
	} else {
		return <button
			className={classNames}
			onClick={onClick as MouseEventHandler<HTMLButtonElement>}
			{...(props as HTMLButtonProps)}
		/>
	}

}

export default Button
