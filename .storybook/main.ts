import type { StorybookConfig } from '@storybook/react-webpack5'
// @ts-ignore
import createWebpackConfig from '../create-webpack-config'
import isEqual from 'lodash/isEqual'

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-coverage',
		'@storybook/addon-a11y',
		'@storybook/addon-actions',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	webpackFinal: async (config) => {
		const webpackConfig = createWebpackConfig(config, { dev: true })

		const cssModuleRule = webpackConfig.module?.rules
			// @ts-ignore
			?.find(rule => isEqual(rule?.include, /\.module\.css$/))

		const rules = config.module?.rules
			?.map(rule => {
				// @ts-ignore
				if (typeof rule === 'object' && rule?.test && isEqual(rule?.test, /\.css$/)) {
					return {
						...rule,
						exclude: /\.module\.css$/,
					}
				}

				if (typeof rule === 'object' && rule?.test && isEqual(rule?.test, /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/)) {
					return {
						...rule,
						test: /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
					}
				}

				return rule
			})
			.concat([
				cssModuleRule,
				{
					test: /\.(tsx?)$/,
					use: [
						'babel-loader',
						{
							loader: require.resolve('ts-loader'),
							options: {
								reportFiles: [
									'../**/src/**/*.{ts,tsx}'
								]
							}
						},
					]
				},
				{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-sprite-loader',
						options: { symbolId: '[name]-[hash:8]' },
					},
					'svgo-loader',
				],
			},
			])

		return {
			...config,
			module: {
				...config.module,
				rules,
			},
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve?.alias,
					...webpackConfig.resolve.alias
				},
				extensions: [
					...(config.resolve?.extensions || []),
					...webpackConfig.resolve.extensions,
				]
			}
		}
	},
}
export default config
