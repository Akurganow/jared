import cn from 'classnames'
import type { SVGAttributes } from 'react'

import * as icons from './icons'

import st from './styles.module.css'

export interface SVGIconProps extends SVGAttributes<SVGElement> {
	name: keyof typeof icons
}

function SVGIcon({ name, className, ...rest }: SVGIconProps) {
	// biome-ignore lint/performance/noDynamicNamespaceImportAccess: реестр иконок обращается к спрайтам по имени
	const icon = icons[name]

	if (!icon) return null

	return (
		<svg aria-hidden="true" {...rest} data-testid="SVGIcon" className={cn(st.icon, className)}>
			<use xlinkHref={`#${icon.id}`} />
		</svg>
	)
}

export default SVGIcon

export { icons }
