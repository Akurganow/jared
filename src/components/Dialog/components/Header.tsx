import cn from 'classnames'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import st from './styles.module.css'

interface DialogHeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function DialogHeader(props: DialogHeaderProps) {
	return <div className={cn(st.header)}>{props.children}</div>
}
