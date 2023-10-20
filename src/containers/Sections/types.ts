import { CSSProperties, HTMLAttributes } from 'react'

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
	id: string
	withTitle?: boolean
	sectionStyle?: CSSProperties
	sectionClassName?: string
}
