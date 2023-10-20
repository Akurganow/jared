import { getHistoryItemProcessorTypes } from 'utils/history'
import st from 'containers/Dialogs/SectionDialog/styles.module.css'
import type { SectionSettingsFieldDisabledProps } from 'types/sections'

export default function DisabledSectionSettings({ name, setting }: SectionSettingsFieldDisabledProps) {
	const types = getHistoryItemProcessorTypes(name)

	return <div key={name} className={st.item}>
		<div className={st.name}>{name}:</div>
		<div className={st.value}>
			<select
				multiple={true}
				name={name}
				defaultValue={setting.value}
			>
				{types.map((type) =>
					<option key={`${name}-${type.name}`} value={type.name}>{type.name}</option>
				)}
			</select>
		</div>
	</div>
}
