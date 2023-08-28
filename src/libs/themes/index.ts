import merge from 'lodash/merge'
import memoize from 'lodash/memoize'
import { Theme } from 'libs/themes/types'
import defaultThemeDark from 'libs/themes/themes/default-dark'

const defaultThemes = {
	dark: defaultThemeDark,
	light: defaultThemeDark,
}
const themes: { [key: string]: Theme } = {}

export function getTheme(name: string = 'default'): Theme {
	const theme = themes[name] || {}

	return merge(defaultThemes[theme.type || 'dark'], theme)
}

export function getThemesNames(): string[] {
	return [...Object.keys(themes), 'default']
}

function getColorOrVarGetter(colors: Theme['colors']) {
	return memoize((value: string) => {
		if (Object.keys(colors).includes(value)) {
			return `var(--color-${value})`
		} else {
			return value
		}
	})
}

function rawGetThemeStylesheet(name: string): string {
	let theme = getTheme()

	if (name !== 'default') {
		theme = getTheme()
	}
	const { colors, tokens, areas } = theme
	const getColorOrVar = getColorOrVarGetter(colors)

	const colorVars = Object.entries(colors).map(([key, value]) => {
		return `--color-${key}: ${value};`
	}).join('')

	const tokenVars = tokens.map(token => {
		const { name, settings } = token
		return Object.entries(settings).map(([key, value]) => {
			return `--token-${name}-${key}: ${getColorOrVar(value)};`
		}).join('')
	}).join('')

	const areaVars = Object.entries(areas).map(([key, value]) => {
		return Object.entries(value).map(([vKey, vValue]) => {
			return `--area-${key}-${vKey}: ${getColorOrVar(vValue)};`
		}).join('')
	}).join('')

	return `
		:root {
			${colorVars}
			${tokenVars}
			${areaVars}
		}
	`
}

export const getThemeStylesheet = memoize(rawGetThemeStylesheet)
