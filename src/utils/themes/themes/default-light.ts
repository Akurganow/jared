import { Theme } from 'utils/themes/types'

const theme: Theme = {
	type: 'light',
	name: 'Default Dark',
	colors: {
		primaryBackground: '#ffffff',
		primaryForeground: '#000000',
		primaryBorder: '#d4d4d4',
		secondaryBackground: '#f3f3f3',
		secondaryForeground: '#616161',
		tertiaryBackground: '#e4e6f1',
		tertiaryForeground: '#616161',
		icon: '#424242',
		iconHover: '#4e4e4e',
		red: '#be1100',
		green: '#008000',
		blue: '#0070c1',
		purple: '#001080',
		yellow: '#bf8803',
		orange: '#795e26',
		pink: '#af00db',
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
				background: 'secondaryBackground',
				foreground: 'secondaryForeground',
				border: 'tertiaryBackground',
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
