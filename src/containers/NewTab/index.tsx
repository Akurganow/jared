import Main from 'components/Main'
import Sidebar from 'components/Sidebar'
import Repo from 'components/Repo'
import Tickets from 'components/Tickets'
import UserContent from 'components/UserContent'
import SettingsDialog from 'components/SettingsDialog'

export default function () {
	return (
		<>
			<Main>
				<Sidebar />
				<Tickets />
				<UserContent />
				<Repo />
			</Main>

			<SettingsDialog />
		</>
	)
}
