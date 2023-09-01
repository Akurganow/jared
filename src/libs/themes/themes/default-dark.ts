import { Theme } from 'libs/themes/types'

const theme: Theme = {
	type: 'dark',
	name: 'Default Dark',
	colors: {
		primaryBackground: '#242424',
		primaryForeground: '#cccccc',
		primaryBorder: '#ffffff1a',
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
		modal: {
			background: 'secondaryBackground',
			foreground: 'secondaryForeground',
			secondaryBackground: 'tertiaryBackground',
			secondaryForeground: 'tertiaryForeground',
		},
		sidebar: {
			background: 'tertiaryBackground',
			foreground: 'tertiaryForeground',
			border: 'primaryBorder'
		},
		form: {
			background: 'primaryBackground',
			foreground: 'primaryForeground',
			border: 'secondaryBackground',
		},
		button: {
			default: {
				background: 'tertiaryBackground',
				foreground: 'tertiaryForeground',
				border: 'secondaryBackground',
			}
		}
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
				foreground: 'purple'
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
				foreground: 'green'
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
