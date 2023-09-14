import React, { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import st from './styles.module.css'

interface HTMLButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

type ButtonProps = HTMLButtonProps

const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
		const classNames = cn(st.button, className)

	return <button
		className={classNames}
		{...props}
	/>

}

export default Button
