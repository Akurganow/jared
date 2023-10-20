import SectionDialog from 'containers/Dialogs/SectionDialog'
import SettingsDialog from 'containers/Dialogs/SettingsDialog'
import BookmarkDialog from 'containers/Dialogs/BookmarkDialog'

export default function Dialogs() {
	return <>
		<SectionDialog />
		<SettingsDialog />
		<BookmarkDialog />
	</>
}
