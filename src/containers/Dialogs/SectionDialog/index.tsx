import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPersistedState } from '@plq/use-persisted-state'
import storage from '@plq/use-persisted-state/lib/storages/local-storage'
import isEqual from 'lodash/isEqual'
import Dialog, { DialogBody, DialogFooter } from 'components/Dialog'
import Button from 'components/Button'
import { closeDialog } from 'store/actions/dialogs'
import { selectedEditingItem } from 'store/selectors/sections'
import SectionSettings from 'src/containers/Dialogs/SectionDialog/SectionSettings'
import { SectionItem } from 'types/sections'
import { setEditingSection, updateSectionItem } from 'store/actions/sections'

const [usePersistedState, clearPersistedState] = createPersistedState('edit-section', storage)

export default function SectionDialog() {
	const dispatch = useDispatch()
	const editingItem = useSelector(selectedEditingItem)
	const [updatedItem, setUpdatedItem] = usePersistedState('updated', editingItem)
	const isDisabled = useMemo(() =>
		isEqual(editingItem, updatedItem)
	, [editingItem, updatedItem])

	const handleClose = useCallback(() => {
		dispatch(closeDialog('section'))
	}, [dispatch])

	const handleCloseComplete = useCallback(() => {
		setUpdatedItem(null)
		dispatch(setEditingSection(null))
		clearPersistedState()
	}, [dispatch, setUpdatedItem])

	const handleChange = useCallback((item: SectionItem) => {
		setUpdatedItem(item)
	}, [setUpdatedItem])

	const handleSave = useCallback(() => {
		if (updatedItem) {
			dispatch(updateSectionItem(updatedItem))
			dispatch(closeDialog('section'))
		}
	}, [dispatch, updatedItem])
	const handleApply = useCallback(() => {
		if (updatedItem) {
			dispatch(updateSectionItem(updatedItem))
			dispatch(setEditingSection(updatedItem.id))
		}
	}, [dispatch, updatedItem])

	if (!editingItem) return null

	return <Dialog
		name="section"
		onCloseComplete={handleCloseComplete}
		style={{ minWidth: '40rem' }}
	>
		<DialogBody>{
			updatedItem
				? <SectionSettings item={updatedItem} onChange={handleChange} />
				: null
		}</DialogBody>
		<DialogFooter>
			<Button disabled={isDisabled} onClick={handleApply} text="Apply" />
			<Button disabled={isDisabled} onClick={handleSave} text="Save" variant="action"  />
			<Button onClick={handleClose} text="Close" />
		</DialogFooter>
	</Dialog>
}
