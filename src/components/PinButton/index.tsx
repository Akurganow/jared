import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import cn from 'classnames'
import SVGIcon from 'components/SVGIcon'
import st from './styles.module.css'

export interface PinButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	pinned?: boolean
}
export default function PiButton({ pinned, className, ...props }: PinButtonProps) {
	return <button {...props} className={cn(className, st.button)}>
		<SVGIcon name={pinned ? 'unpin' : 'pin'} />
	</button>
}
