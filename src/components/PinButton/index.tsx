import cn from 'classnames'
import SVGIcon from 'components/SVGIcon'
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import st from './styles.module.css'

export interface PinButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	pinned?: boolean
}
export default function PinButton({ pinned, className, ...props }: PinButtonProps) {
	return (
		<button type="button" aria-label={pinned ? 'Unpin' : 'Pin'} {...props} className={cn(className, st.button)}>
			<SVGIcon name={pinned ? 'unpin' : 'pin'} />
		</button>
	)
}
