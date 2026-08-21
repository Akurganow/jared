require('dotenv').config()
const path = require('node:path')
const { merge } = require('webpack-merge')
const { uniq, get } = require('lodash')

const Dotenv = require('dotenv-webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = (config, { dev }) => {
	config.devtool = dev ? 'inline-source-map' : 'source-map'

	config.module = merge(get(config, 'config.module', {}), {
		rules: get(config, 'module.rules', []).concat([
			{
				test: /\.tsx?$/,
				use: ['babel-loader', 'ts-loader'],
				exclude: [/node_modules/],
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-sprite-loader',
						options: { symbolId: !dev ? '[hash:8]' : '[name]-[hash:8]' },
					},
					'svgo-loader',
				],
			},
			{
				test: /\.module\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: !dev ? '[hash:base64:16]' : '[folder]__[local]--[hash:base64:8]',
								auto: true,
								// css-loader 7 по умолчанию включает namedExport — сохраняем
								// поведение default-импорта css-модулей (import st from '...')
								namedExport: false,
								exportLocalsConvention: 'as-is',
							},
						},
					},
					'postcss-loader',
				],
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								auto: true,
								namedExport: false,
								exportLocalsConvention: 'as-is',
							},
						},
					},
					'postcss-loader',
				],
				exclude: [/\.module\.css$/],
			},
		]),
	})

	config.resolve = merge(get(config, 'config.resolve', {}), {
		extensions: uniq(get(config, 'resolve.extensions', []).concat(['.tsx', '.ts', '.js', '.jsx', '.json', '.css'])),
		alias: merge(get(config, 'resolve.alias', {}), {
			components: path.resolve(__dirname, './src/components'),
			containers: path.resolve(__dirname, './src/containers'),
			utils: path.resolve(__dirname, './src/utils'),
			pages: path.resolve(__dirname, './src/pages'),
			store: path.resolve(__dirname, './src/store'),
			types: path.resolve(__dirname, './src/types'),
			src: path.resolve(__dirname, './src'),
			package: path.resolve(__dirname, './package.json'),
			'storybook-fixtures': path.resolve(__dirname, './.storybook/fixtures'),
		}),
	})

	config.plugins = get(config, 'plugins', []).concat([
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				configFile: path.resolve(__dirname, './tsconfig.json'),
			},
		}),
		new Dotenv({
			safe: true,
			systemvars: true,
		}),
	])

	return config
}
