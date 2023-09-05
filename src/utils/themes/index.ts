import merge from 'lodash/merge'
import memoize from 'lodash/memoize'
import { Theme } from 'utils/themes/types'
import defaultThemeDark from 'utils/themes/themes/default-dark'
import defaultThemeLight from 'utils/themes/themes/default-light'

const defaultThemes = {
	dark: defaultThemeDark,
	light: defaultThemeLight,
}
const themes: { [key: string]: Theme } = {
	'default-dark': defaultThemeDark,
	'default-light': defaultThemeLight,
}

export function getTheme(name: string = 'default-dark'): Theme {
	const theme = themes[name] || {}

	return merge(defaultThemes[theme.type || 'dark'], theme)
}

export function getThemesNames(): string[] {
	return [...Object.keys(themes), 'default-dark', 'default-light']
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
	const theme = getTheme(name)

	const { colors, tokens, areas } = theme
	const getColorOrVar = getColorOrVarGetter(colors)

	const colorVars = Object.entries(colors).reduce((acc, [key, value]) => {
		return `${acc}--color-${key}: ${value};\n`
	}, '')

	const tokenVars = tokens.flatMap(token => {
		const { name, settings } = token
		return Object.entries(settings).map(([key, value]) => {
			return `--token-${name}-${key}: ${getColorOrVar(value)};`
		})
	}).join('\n')

	const areaVars = Object.entries(areas).flatMap(([key, value]) => {
		return Object.entries(value).flatMap(([vKey, vValue]) => {
			if (key === 'button') {
				return Object.entries(vValue).map(([vvKey, vvValue]) => {
					if (typeof vvValue !== 'string') {
						throw new Error(`Expected theme ${key}.${vKey}.${vvKey} to be a string, but got ${typeof vvValue}`)
					}
					return `--area-${key}-${vKey}-${vvKey}: ${getColorOrVar(vvValue)};`
				})
			} else {
				return `--area-${key}-${vKey}: ${getColorOrVar(vValue)};`
			}
		})
	}).join('\n')

	return `
		:root {
			${colorVars}
			${tokenVars}
			${areaVars}
		}
	`
}

export const getThemeStylesheet = memoize(rawGetThemeStylesheet)
