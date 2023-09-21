import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import st from './styles.module.css'

interface HTMLButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	variant?: 'action' | 'danger' | 'warning'
}

const Button = ({ className, ...props }: HTMLButtonProps) => {
	const classNames = cn(st.button, className)

	return <button
		data-testid="Button"
		className={classNames}
		{...props}
	/>
}

export default Button
