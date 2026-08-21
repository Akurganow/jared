import type { SectionSettingsFieldPropsBase } from 'types/sections'
import st from '../styles.module.css'

export default function StringSetting({ name, setting }: SectionSettingsFieldPropsBase<string>) {
	return (
		<div className={st.item}>
			<div className={st.name}>{name}:</div>
			<div className={st.value}>
				<input type="text" name={name} defaultValue={setting.value} />
			</div>
		</div>
	)
}
