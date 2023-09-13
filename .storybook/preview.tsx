import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'
import 'styles/common.css'
import 'modern-css-reset/dist/reset.min.css'

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
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
