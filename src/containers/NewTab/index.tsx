import { useSelector } from 'react-redux'
import Main from 'containers/Main'
import Sidebar from 'containers/Sidebar'
import VCS from 'containers/VCS'
import ITS from 'containers/ITS'
import UserContent from 'containers/UserContent'
import SettingsDialog from 'containers/SettingsDialog'
import BookmarkDialog from 'containers/BookmarkDialog'
import Bookmarks from 'containers/Bookmarks'
import { getThemeStylesheet } from 'utils/themes'
import { selectedSettingValue } from 'store/selectors/settings'

export default function () {
	const theme = useSelector(selectedSettingValue('theme')) as unknown as string
	const themeStylesheet = getThemeStylesheet(theme)

	return (
		<>
			{themeStylesheet && <style>{themeStylesheet}</style>}
			<Main>
				<Sidebar />
				<ITS />
				<UserContent />
				<Bookmarks />
				<VCS />
			</Main>

			<SettingsDialog />
			<BookmarkDialog />
		</>
	)
}
