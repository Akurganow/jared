import { Theme } from 'types/themes'

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
		danger: '#ab181f',
		success: '#6a8759',
		info: '#7a9ec2',
		list: '#9e7bb0',
		notify: '#ffc66d',
		warning: '#cc8242',
		personal: '#da70d6',
	},
	areas: {
		page: {
			background: 'primaryBackground',
			foreground: 'primaryForeground',
			hoverForeground: 'secondaryForeground',
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
				foreground: 'warning'
			}
		},
		{
			name: 'filter',
			settings: {
				foreground: 'list'
			}
		},
		{
			name: 'preferences',
			settings: {
				foreground: 'info'
			}
		},
		{
			name: 'person',
			settings: {
				foreground: 'personal'
			}
		},
		{
			name: 'file',
			settings: {
				foreground: 'success'
			}
		},
		{
			name: 'changes',
			settings: {
				foreground: 'notify'
			}
		},
		{
			name: 'unknown',
			settings: {
				foreground: 'danger'
			}
		}
	]
}

export default theme
