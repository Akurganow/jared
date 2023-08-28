type ThemeAreas = 'page' | 'sidebar' | 'modal'
type ThemeSettings = Partial<{
	background: string
	foreground: string
	secondaryBackground: string
	secondaryForeground: string
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
		[key in ThemeAreas]?: ThemeSettings;
	}
}
