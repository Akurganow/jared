import { useSelector } from 'react-redux'
import Main from 'components/Main'
import Sidebar from 'components/Sidebar'
import VCS from 'components/VCS'
import ITS from 'components/ITS'
import UserContent from 'components/UserContent'
import SettingsDialog from 'components/SettingsDialog'
import { getThemeStylesheet } from 'utils/themes'
import { selectedSettingValue } from 'store/selectors/settings'

export default function () {
	const theme = useSelector(selectedSettingValue('theme')) as unknown as string
	const themeStylesheet = getThemeStylesheet(theme)

	return (
		<>
			<style>{themeStylesheet}</style>
			<Main>
				<Sidebar />
				<ITS />
				<UserContent />
				<VCS />
			</Main>

			<SettingsDialog />
		</>
	)
}
