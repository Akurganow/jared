// @ts-ignore
import createWebpackConfig from '../create-webpack-config.js'
import type { StorybookConfig } from '@storybook/react-webpack5'
import type { Configuration, RuleSetRule } from 'webpack'
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
		{
			name: '@storybook/addon-styling-webpack',
			options: {
				rules: [
					{
						test: /\.css$/,
						use: [
							'style-loader',
							{
								loader: 'css-loader',
								options: {
									modules: {
										auto: true,
										localIdentName: '[name]__[local]--[hash:base64:5]',
									},
								},
							},
							'postcss-loader',
						],
					}
				]
			}
		}
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	webpackFinal: async (config) => {
		const customConfig = createWebpackConfig({ ...config }, { dev: false }) as Configuration

		config.resolve = customConfig.resolve as typeof config.resolve

		if (config.module && config.module.rules) {
			config.module.rules = config.module.rules.map((rule) => {
				if (rule && (rule as RuleSetRule).test && isEqual((rule as RuleSetRule).test, /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/)) {
					return {
						...rule as RuleSetRule,
						test: /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
					}
				}

				if (rule && (rule as RuleSetRule).test && isEqual((rule as RuleSetRule).test, /\.module\.css$/)) {
					return {
						...rule as RuleSetRule,
						use: [((rule as RuleSetRule).use), 'postcss-loader'].flat()
					}
				}

				return rule
			}) as RuleSetRule[]

			config.module.rules.push(
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
			)
		}

		return config
	}
}
export default config
