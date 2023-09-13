import React, { SVGAttributes } from 'react'
import cn from 'classnames'

import * as icons from './icons'

import st from './styles.module.css'

export interface SVGIconProps extends SVGAttributes<SVGElement> {
	name: keyof typeof icons;
}

function SVGIcon({ name, className, ...rest }: SVGIconProps) {
	const icon = icons[name]

	if (!icon) return null

	return (
		<svg
			{...rest}
			className={cn(st.icon, className)}
		>
			<use xlinkHref={`#${icon.id}`} />
		</svg>
	)
}

export default SVGIcon

export { icons }
