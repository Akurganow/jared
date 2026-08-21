import cn from 'classnames'
import {
	type DetailedHTMLProps,
	type HTMLAttributes,
	type MouseEvent as ReactMouseEvent,
	useEffect,
	useRef,
} from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { closeDialog } from 'store/actions/dialogs'
import { selectedDialog } from 'store/selectors/dialogs'
import DialogBody from './components/Body'
import DialogFooter from './components/Footer'
import DialogHeader from './components/Header'
import st from './styles.module.css'

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
		<dialog ref={dialog} className={cn(st.dialog, className)} onMouseDown={handleMouseDownDialog} {...props}>
			{children}
		</dialog>
	)

	return isOpenCurrent ? createPortal(element, container) : null
}

export { DialogBody, DialogFooter, DialogHeader }
