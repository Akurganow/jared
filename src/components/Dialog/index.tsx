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
	isOpen?: boolean
	isClickOutsideClose?: boolean
	onCloseComplete?: () => void
}

export default function Dialog({
	name,
	isClickOutsideClose = true,
	isOpen = false,
	onCloseComplete,
	className,
	children,
	...props
}: DialogProps) {
	const dispatch = useDispatch()
	const container = document.getElementById('dialog')
	const dialog = useRef<HTMLDialogElement>(null)
	const isOpenStored = useSelector(selectedDialog(name))
	const isOpenCurrent = isOpen || isOpenStored

	useEffect(() => {
		if (dialog.current?.open === isOpenCurrent) return

		if (isOpenCurrent) {
			dialog.current?.showModal()
		} else {
			dialog.current?.close()
			onCloseComplete?.()
		}
	}, [isOpenCurrent, onCloseComplete])

	if (!container) return null

	const handleMouseDownDialog = (event: ReactMouseEvent<HTMLDialogElement, MouseEvent>) => {
		const target = event.target as HTMLElement

		if (!isClickOutsideClose) return

		if (dialog.current === target) {
			dispatch(closeDialog(name))
			onCloseComplete?.()
		}
	}

	const element = (
		<dialog
			ref={dialog}
			className={cn(st.dialog, className)}
			onMouseDown={handleMouseDownDialog}
			{...props}
		>
			{children}
		</dialog>
	)

	return isOpenCurrent ? createPortal(element, container) : null
}

export { DialogHeader, DialogBody, DialogFooter }
