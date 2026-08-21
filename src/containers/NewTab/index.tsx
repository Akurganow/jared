import Main from 'containers/Main'
import Section from 'containers/Sections/Section'
import { useSelector } from 'react-redux'
import Dialogs from 'src/containers/Dialogs'
import { selectedSettingValue } from 'store/selectors/settings'
import { getThemeStylesheet } from 'utils/themes'

export default function NewTab() {
	const theme = useSelector(selectedSettingValue('theme')) as unknown as string
	const themeStylesheet = getThemeStylesheet(theme)

	return (
		<>
			{themeStylesheet && <style>{themeStylesheet}</style>}

			<Main>
				<Section id="1" />
			</Main>

			<Dialogs />
		</>
	)
}
