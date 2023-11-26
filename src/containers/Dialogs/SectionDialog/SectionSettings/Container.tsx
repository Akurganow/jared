import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { nanoid } from 'nanoid'
import OptionField from 'src/containers/Dialogs/SectionDialog/SettingsTypes/Option'
import { selectedSection } from 'store/selectors/sections'
import Button from 'components/Button'
import { addSection, updateSectionType } from 'store/actions/sections'
import { DEFAULT_HISTORY_SECTION_SETTINGS, sectionTypes } from 'store/constants/sections'
import SVGIcon from 'components/SVGIcon'
import st from '../styles.module.css'
import type { ChangeEvent, MouseEvent } from 'react'
import type { SectionItemContainer, SectionSettingsProps } from 'types/sections'

export type SectionSettings = SectionItemContainer['settings']
export type SectionSettingKey = keyof SectionSettings
export type SectionSettingValue = SectionSettings[SectionSettingKey]['value']

function Item({ id, index, handleRemove }: { id: string, index: number, handleRemove: () => void }) {
	const dispatch = useDispatch()
	const section = useSelector(selectedSection(id))

	const handleTypeChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
		const newType = event.target.value as unknown as typeof sectionTypes[number]

		dispatch(updateSectionType({ id, type: newType }))
	}, [dispatch, id])

	return <div className={st.item}>
		<div className={st.name}>section {index + 1}:</div>
		<div className={st.value}>
			<select defaultValue={section?.type} onChange={handleTypeChange}>
				{sectionTypes.map(type =>
					<option key={type}>{type}</option>
				)}
			</select>
		</div>
		<div className={st.actions}>
			<button className={st.action} onClick={handleRemove} type="button">
				<SVGIcon name="trash" />
			</button>
		</div>
	</div>
}

export default function ContainerSectionSettings({ item, onChange }: SectionSettingsProps<SectionItemContainer>) {
	const dispatch = useDispatch()
	const { items, settings } = item
	const newItem = useSelector(selectedSection(items[0]))

	const createUpdatedItem = useCallback((name: SectionSettingKey, value: SectionSettingValue) => {
		return {
			...item,
			settings: {
				...settings,
				[name]: {
					...item.settings[name],
					value
				}
			}
		}
	}, [item, settings])

	const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
		const value = event.target.value as SectionSettingValue
		const name = event.target.name as SectionSettingKey
		const newItem = createUpdatedItem(name, value)

		onChange(newItem)
	}

	const handleRemove = useCallback((id: string) => () => {
		// dispatch(removeSection(id))
		onChange({
			...item,
			items: items.filter(item => item !== id)
		})
	}, [item, items, onChange])

	const handleAdd = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()

		const newId = nanoid()

		dispatch(addSection({
			...(newItem
				? newItem
				: {
					type: 'history',
					settings: DEFAULT_HISTORY_SECTION_SETTINGS,
					items: [],
					pinned: [],
				}
			),
			id: newId,
		}))

		onChange({
			...item,
			items: [
				...item.items,
				newId,
			]
		})
	}, [dispatch, item, newItem, onChange])

	return (
		<form
			className={st.container}
			onChange={handleChange}
		>
			<OptionField name="direction" setting={settings.direction} />

			{items.map((item, index) =>
				<Item
					key={item}
					id={item}
					index={index}
					handleRemove={handleRemove(item)}
				/>)}

			<div className={st.item}>
				<div className={st.name}></div>
				<div className={st.value}>
					<Button type="button" variant="action" onClick={handleAdd}>Add Section</Button>
				</div>
			</div>
		</form>
	)
}
