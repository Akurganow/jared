import { DetailedHTMLProps, HTMLAttributes } from 'react'
import cn from 'classnames'
import st from './styles.module.css'

interface MainProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
}

export default function ({ children, className, ...props }: MainProps) {
	return (
		<main
			className={cn(st.main, className)}
			{...props}
		>
			{children}
		</main>
	)
}
