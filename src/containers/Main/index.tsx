import { DetailedHTMLProps, HTMLAttributes } from 'react'
import Sidebar from 'containers/Sidebar'
import st from './styles.module.css'

interface MainProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
}

export default function ({ children, ...props }: MainProps) {
	return (
		<main
			className={st.main}
			{...props}
		>
			<Sidebar />

			<div className={st.content}>
				{children}
			</div>
		</main>
	)
}
