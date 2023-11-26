import { useMemo } from 'react'
import Dialog, { DialogBody, DialogHeader } from 'components/Dialog'
import pack from 'package'
import st from './styles.module.css'

export default function HelpDialog() {
	const currentYear = useMemo(() => new Date().getFullYear(), [])

	return <Dialog name="help">
		<DialogHeader>👋 Welcome to Jared! I&apos;m glad you&apos;re here.</DialogHeader>
		<DialogBody className={st.body}>
			<p>Jared version: {pack.version}</p>
			<ul>
				<li><a href="https://github.com/Akurganow/jared" rel="noreferrer">GitHub Repository</a></li>
				<li><a href="https://github.com/Akurganow/jared/issues" rel="noreferrer">Report an Issue</a></li>
				<li><a href="https://jared-web-extension.netlify.app/privacy-policy/" rel="noreferrer">Privacy Policy</a></li>
			</ul>

			<p>© {currentYear} Jared. All rights reserved.</p>
		</DialogBody>
	</Dialog>
}
