import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import st from './styles.module.css'

interface HTMLButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	variant?: 'action' | 'danger' | 'warning' | 'default'
	text?: string
}

const Button = ({ children, className, variant = 'default', text, ...props }: HTMLButtonProps) => {
	const classNames = cn(
		st.button,
		className,
		st[variant],
	)

	return <button
		data-testid="Button"
		className={classNames}
		{...props}
	>
		{text || children}
	</button>
}

export default Button
