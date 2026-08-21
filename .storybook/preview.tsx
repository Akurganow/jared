import type { Preview } from '@storybook/react-webpack5'
import { themes } from 'storybook/theming'
import 'modern-css-reset/dist/reset.min.css'
import '../app/styles/newtab.css'

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		docs: {
			theme: themes.dark,
		},
	},
}

export default preview
