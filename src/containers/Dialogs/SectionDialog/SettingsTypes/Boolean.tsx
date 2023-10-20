import { SectionSettingsFieldPropsBase } from 'types/sections'
import st from '../styles.module.css'


export default function BooleanField({ name, setting }: SectionSettingsFieldPropsBase<boolean>) {
	return (
		<div className={st.item}>
			<div className={st.name}>{name}:</div>
			<div className={st.value}>
				<input
					type="checkbox"
					name={name}
					defaultChecked={setting.value}
				/>
			</div>
			<div />
		</div>
	)
}
