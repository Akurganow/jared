import cn from 'classnames'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import st from './styles.module.css'

interface DialogBodyProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function DialogBody({ className, ...props }: DialogBodyProps) {
	return <div className={cn(className, st.body)} {...props} />
}
