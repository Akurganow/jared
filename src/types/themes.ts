type ThemeAreas = 'page' | 'sidebar' | 'modal' | 'form'
type ThemeSettings = Partial<{
	background: string
	foreground: string
	secondaryBackground: string
	secondaryForeground: string
	hoverBackground?: string
	hoverForeground?: string
	border: string
	fontStyle: string
}>

interface ThemeData {
	name: string
	settings: ThemeSettings
}

export interface Theme {
	name: string;
	type: 'dark' | 'light'
	colors: {
		[key: string]: string
	}
	tokens: ThemeData[];
	areas: {
		button?: {
			default?: ThemeSettings
			action?: ThemeSettings
			danger?: ThemeSettings
			warning?: ThemeSettings
			disabled?: ThemeSettings
		};
	} & {
		[key in ThemeAreas]?: ThemeSettings;
	}
}
