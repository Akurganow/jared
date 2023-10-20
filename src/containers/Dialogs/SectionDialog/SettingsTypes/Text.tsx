import { SectionSettingsFieldPropsText } from 'types/sections'
import st from '../styles.module.css'


export default function ({ name, setting }: SectionSettingsFieldPropsText) {
	return (
		<div className={st.item}>
			<div className={st.name}>{name}:</div>
			<div className={st.value}>
				<textarea
					rows={3}
					name={name}
					defaultValue={setting.value}
				/>
			</div>
		</div>
	)
}
