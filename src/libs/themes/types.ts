type ThemeAreas = 'page' | 'sidebar'
type ThemeSettings = {
	background?: string
	foreground?: string
	border?: string
	fontStyle?: string
}
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
