import { useEffect, useState } from 'react'
import cn from 'classnames'
import LayoutImage from 'components/LayoutImage'
import st from './styles.module.css'
import type { ChangeEvent, HTMLAttributes } from 'react'
import type { LayoutType } from 'types/settings'

interface LayoutSelectProps extends Omit<HTMLAttributes<HTMLFormElement>, 'onChange'> {
	current: LayoutType
	onChange: (layout: LayoutType) => void
}

export default ({ current, onChange, className, ...props }: LayoutSelectProps) => {
	const [currentLayout, setCurrentLayout] = useState<LayoutType>(current)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const layout = event.target.value as LayoutType
		setCurrentLayout(layout)
		onChange(layout)
	}

	useEffect(() => {
		setCurrentLayout(current)
	}, [current])

	return <form
		{...props}
		className={cn(st.container, className)}
	>
		<label className={st.section}>
			<LayoutImage
				layout="full"
				className={st.image}
			/>
			<div className={st.label}>
				<input
					type="radio"
					name="layout"
					value="full"
					checked={currentLayout === 'full'}
					onChange={handleChange}
					className={st.input}
				/>
				Full
			</div>
		</label>

		<label className={st.section}>
			<LayoutImage
				layout="compact"
				className={st.image}
			/>
			<div className={st.label}>
				<input
					type="radio"
					name="layout"
					value="compact"
					checked={currentLayout === 'compact'}
					onChange={handleChange}
					className={st.input}
				/>
				Compact
			</div>
		</label>
	</form>
}
