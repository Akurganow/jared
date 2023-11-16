import SectionDialog from 'containers/Dialogs/SectionDialog'
import SettingsDialog from 'containers/Dialogs/SettingsDialog'
import DownloadsDialog from 'containers/Dialogs/DownloadsDialog'

export default function Dialogs() {
	return <>
		<SectionDialog />
		<SettingsDialog />
		<DownloadsDialog />
	</>
}
