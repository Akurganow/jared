import DownloadsDialog from 'containers/Dialogs/DownloadsDialog'
import HelpDialog from 'containers/Dialogs/HelpDialog'
import SectionDialog from 'containers/Dialogs/SectionDialog'
import SettingsDialog from 'containers/Dialogs/SettingsDialog'

export default function Dialogs() {
	return (
		<>
			<SectionDialog />
			<SettingsDialog />
			<DownloadsDialog />
			<HelpDialog />
		</>
	)
}
