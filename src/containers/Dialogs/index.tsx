import SectionDialog from 'containers/Dialogs/SectionDialog'
import SettingsDialog from 'containers/Dialogs/SettingsDialog'
import DownloadsDialog from 'containers/Dialogs/DownloadsDialog'
import HelpDialog from 'containers/Dialogs/HelpDialog'

export default function Dialogs() {
	return <>
		<SectionDialog />
		<SettingsDialog />
		<DownloadsDialog />
		<HelpDialog />
	</>
}
