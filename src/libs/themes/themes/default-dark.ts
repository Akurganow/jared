import { Theme } from 'libs/themes/types'

const theme: Theme = {
	type: 'dark',
	name: 'Default Dark',
	colors: {
		primaryBackground: '#242424',
		primaryForeground: '#cccccc',
		secondaryBackground: '#323232',
		secondaryForeground: '#ffffff',
		tertiaryBackground: '#ffffff1a',
		tertiaryForeground: '#cccccc',
		icon: '#ffffff66',
		iconHover: '#ffffff',
		red: '#ab181f',
		green: '#6a8759',
		blue: '#7a9ec2',
		purple: '#9e7bb0',
		yellow: '#ffc66d',
		orange: '#cc8242',
		pink: '#da70d6',
	},
	areas: {
		page: {
			background: 'primaryBackground',
			foreground: 'primaryForeground'
		},
		sidebar: {
			background: 'tertiaryBackground',
			foreground: 'tertiaryForeground',
			border: '#ffffff1a'
		},
	},
	tokens: [
		{
			name: 'item',
			settings: {
				foreground: 'orange'
			}
		},
		{
			name: 'filter',
			settings: {
				foreground: 'green'
			}
		},
		{
			name: 'preferences',
			settings: {
				foreground: 'blue'
			}
		},
		{
			name: 'person',
			settings: {
				foreground: 'pink'
			}
		},
		{
			name: 'file',
			settings: {
				foreground: 'purple'
			}
		},
		{
			name: 'changes',
			settings: {
				foreground: 'yellow'
			}
		},
		{
			name: 'unknown',
			settings: {
				foreground: 'red'
			}
		}
	]
}

export default theme
