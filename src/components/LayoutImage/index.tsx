import fullImage from 'components/LayoutImage/images/full.svg'
import compactImage from 'components/LayoutImage/images/compact.svg'
import type { SVGAttributes } from 'react'
import type { LayoutType } from 'types/settings'

interface LayoutImageProps extends SVGAttributes<SVGElement> {
	layout: LayoutType
}

const images = {
	full: fullImage,
	compact: compactImage,
}

export default ({ layout, ...props }: LayoutImageProps) => {
	const current = images[layout]

	return <svg
		{...props}
		width="192px"
		height="108px"
		data-testid="LayoutImage"
	>
		<use xlinkHref={`#${current.id}`} />
	</svg>
}
