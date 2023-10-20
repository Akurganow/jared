import { SectionSettingsFieldPropsBase } from 'types/sections'
import st from '../styles.module.css'


export default function ({ name, setting }: SectionSettingsFieldPropsBase<number>) {
	return (
		<div className={st.item}>
			<div className={st.name}>{name}:</div>
			<div className={st.value}>
				<input
					type="number"
					name={name}
					defaultValue={setting.value}
				/>
			</div>
		</div>
	)
}
