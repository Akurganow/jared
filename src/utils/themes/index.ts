import memoize from 'lodash/memoize'
import jbDarkula from 'utils/themes/themes/jb-darkula'
import jbLight from 'utils/themes/themes/jb-light'
import type { Theme } from 'types/themes'

const themes: { [key: string]: Theme } = {
	'JB-Darcula': jbDarkula,
	'JB-Light': jbLight,
}

export function getTheme(name: string = ''): Theme | undefined {
	return themes[name]
}

export function getThemesNames(): string[] {
	return ['System', ...Object.keys(themes)]
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

interface CSSVar {
	[key: string]: string | CSSVar | { [key: string]: string | CSSVar }
}
function convertToCSSVar(
	key: string,
	value: string | CSSVar,
	valueFunction: (value: string) => string = memoize((value) => value),
	prefix: string = '',
): string {
	console.log(key, value, prefix)
	if (typeof value === 'string') {
		return `--${prefix}-${key}: ${valueFunction(value)};`
	} else {
		return Object.entries(value).map(([k, v]) => {
			return convertToCSSVar(k, v, valueFunction, `${prefix && `${prefix}-`}${key}`)
		}).join('\n')
	}
}

function rawGetThemeStylesheet(name: string): string | undefined {
	const theme = getTheme(name)

	if (!theme) return

	const { colors, tokens, areas } = theme
	const getColorOrVar = getColorOrVarGetter(colors)
	const colorVars = convertToCSSVar('color', colors, getColorOrVar)
	const tokenVars = tokens.flatMap(token => {
		const { name, settings } = token
		return convertToCSSVar(name, settings, getColorOrVar, 'token')
	}).join('\n')

	const areaVars = convertToCSSVar('area', areas, getColorOrVar)

	return `
		:root {
			${colorVars}
			${tokenVars}
			${areaVars}
		}
	`
}

export const getThemeStylesheet = memoize(rawGetThemeStylesheet)
