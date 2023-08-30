type ThemeAreas = 'page' | 'sidebar' | 'modal' | 'form'
type ThemeSettings = Partial<{
	background: string
	foreground: string
	secondaryBackground: string
	secondaryForeground: string
	border: string
	fontStyle: string
}>
type ThemeButtonSettings = Partial<{
	hoverBackground: string
	hoverForeground: string
}> & ThemeSettings
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
			default?: ThemeButtonSettings
			action?: ThemeButtonSettings
			danger?: ThemeButtonSettings
			warning?: ThemeButtonSettings
			disabled?: ThemeButtonSettings
		};
	} & {
		[key in ThemeAreas]?: ThemeSettings;
	}
}
