import { useSelector } from 'react-redux'
import { getThemeStylesheet } from 'utils/themes'
import { selectedSettingValue } from 'store/selectors/settings'
import Section from 'containers/Sections/Section'
import Main from 'containers/Main'
import Dialogs from 'src/containers/Dialogs'

export default function () {
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
