import type { StorybookConfig } from '@storybook/react-webpack5'
import type { Configuration, RuleSetRule } from 'webpack'
// @ts-expect-error CJS-модуль без типов
import createWebpackConfig from '../create-webpack-config.js'

const cssModulesOptions = {
	auto: true,
	namedExport: false,
	exportLocalsConvention: 'as-is',
	localIdentName: '[name]__[local]--[hash:base64:5]',
}

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	staticDirs: ['./public'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-docs',
		'@storybook/addon-a11y',
		'@storybook/addon-coverage',
		'@storybook/addon-webpack5-compiler-babel',
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
									importLoaders: 1,
									modules: cssModulesOptions,
								},
							},
							'postcss-loader',
						],
					},
				],
			},
		},
		'@storybook/addon-mcp',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	webpackFinal: async (config) => {
		const customConfig = createWebpackConfig({}, { dev: false }) as Configuration

		// алиасы и расширения — из общей фабрики вебпак-конфига
		config.resolve = {
			...config.resolve,
			...customConfig.resolve,
			alias: {
				...config.resolve?.alias,
				...(customConfig.resolve?.alias as Record<string, string>),
			},
		}

		if (config.module?.rules) {
			// svg обрабатывается svg-sprite-loader, исключаем его из дефолтных asset-правил
			config.module.rules = (config.module.rules as RuleSetRule[]).map((rule) => {
				if (rule && typeof rule === 'object' && rule.test instanceof RegExp && rule.test.test('.svg')) {
					return { ...rule, exclude: /\.svg$/ }
				}

				return rule
			})

			config.module.rules.push({
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-sprite-loader',
						options: { symbolId: '[name]-[hash:8]' },
					},
					'svgo-loader',
				],
			})
		}

		return config
	},
}
export default config
