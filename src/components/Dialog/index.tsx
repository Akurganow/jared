import { MouseEvent as ReactMouseEvent, DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from 'react'
import cn from 'classnames'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectedDialog } from 'store/selectors/dialogs'
import { closeDialog } from 'store/actions/dialogs'
import st from './styles.module.css'

import DialogHeader from './components/Header'
import DialogBody from './components/Body'
import DialogFooter from './components/Footer'

interface DialogProps extends DetailedHTMLProps<HTMLAttributes<HTMLDialogElement>, HTMLDialogElement> {
    name: string
    isClickOutsideClose?: boolean
	onCloseComplete?: () => void
}

export default function Dialog({
	name,
	isClickOutsideClose = true,
	onCloseComplete,
	className,
	children
}: DialogProps) {
	const dispatch = useDispatch()
	const container = document.getElementById('dialog')

	if (!container) return null

	const dialog = useRef<HTMLDialogElement>(null)
	const isOpen = useSelector(selectedDialog(name))

	const handleMouseDownDialog = (event: ReactMouseEvent<HTMLDialogElement, MouseEvent>) => {
		const target = event.target as HTMLElement

		if (!isClickOutsideClose) return

		if (dialog.current === target) {
			dispatch(closeDialog(name))
			onCloseComplete?.()
		}
	}


	useEffect(() => {
		if (dialog.current?.open === isOpen) return

		if (isOpen) {
			dialog.current?.showModal()
		} else {
			dialog.current?.close()
		}
	}, [isOpen])

	const element = (
		<dialog ref={dialog} className={cn(st.dialog, className)} onMouseDown={handleMouseDownDialog}>
			{children}
		</dialog>
	)

	return isOpen ? createPortal(element, container) : null
}

export { DialogHeader, DialogBody, DialogFooter }
