import { DetailedHTMLProps, HTMLAttributes } from 'react'
import cn from 'classnames'
import st from './styles.module.css'

interface DialogBodyProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

export default function ({ className, ...props }: DialogBodyProps) {
	return (
		<div className={cn(className, st.body)} {...props} />
	)
}
