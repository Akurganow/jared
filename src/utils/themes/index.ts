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

function rawGetThemeStylesheet(name: string): string | undefined {
	const theme = getTheme(name)

	if (!theme) return

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
