import { SectionSettingsFieldPropsOption } from 'types/sections'
import st from '../styles.module.css'


export default function OptionField({ name, setting }: SectionSettingsFieldPropsOption) {
	const { value, options } = setting

	return (
		<div className={st.item}>
			<div className={st.name}>{name}:</div>
			<div className={st.value}>
				<select name={name} defaultValue={value}>
					{options.map(option =>
						<option key={option} value={option}>
							{option}
						</option>)
					}
				</select>
			</div>
			<div />
		</div>
	)
}
