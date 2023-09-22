import type { Theme } from 'types/themes'

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
		danger: '#be1100',
		success: '#008000',
		info: '#0070c1',
		list: '#001080',
		notify: '#bf8803',
		warning: '#795e26',
		personal: '#af00db',
		disabled: {
			danger: '#be1100',
			success: '#008000',
			info: '#0070c1',
			list: '#001080',
			notify: '#bf8803',
			warning: '#795e26',
			personal: '#af00db',
		}
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
				background: 'secondaryBackground',
				foreground: 'secondaryForeground',
				border: 'tertiaryBackground',
				disabled: {
					background: 'tertiaryBackground',
					foreground: 'primaryBorder',
					border: 'primaryBorder',
				}
			},
			action: {
				background: 'info',
				foreground: 'primaryBackground',
				border: 'info',
				disabled: {
					background: 'tertiaryBackground',
					foreground: 'disabled-info',
					border: 'disabled-info',
				}
			},
			danger: {
				background: 'danger',
				foreground: 'primaryBackground',
				border: 'danger',
				disabled: {
					background: 'tertiaryBackground',
					foreground: 'disabled-danger',
					border: 'disabled-danger',
				}
			},
			warning: {
				background: 'warning',
				foreground: 'primaryBackground',
				border: 'warning',
				disabled: {
					background: 'tertiaryBackground',
					foreground: 'disabled-warning',
					border: 'disabled-warning',
				}
			},
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
