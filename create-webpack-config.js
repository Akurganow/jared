/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
require('dotenv').config()
const path = require('path')
const { merge } = require('webpack-merge')
const { uniq, get } = require('lodash')

const Dotenv = require('dotenv-webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (config, { dev }) => merge(config, {
	devtool: dev ? 'inline-source-map' : 'source-map',
	module: merge(config.module ?? {}, {
		rules: (get(config, 'module.rules', [])).concat([
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
				test: /\.css$/i,
				use: [
					(dev ? 'style-loader' : {
						loader: MiniCssExtractPlugin.loader,
					}),
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: !dev
									? '[hash:base64:16]'
									: '[folder]__[local]--[hash:base64:8]',
								auto: true,
							},
						},
					},
					'postcss-loader',
				],
				include: /\.module\.css$/,
			},
			{
				test: /\.css$/,
				use: [
					(dev ? 'style-loader' : {
						loader: MiniCssExtractPlugin.loader,
					}),
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					'postcss-loader',
				],
				exclude: /\.module\.css$/,
			},
		]),
	}),
	resolve: merge((get(config, 'config.resolve', {})), {
		extensions: uniq(get(config, 'resolve.extensions', []).concat(['.tsx', '.ts', '.js', '.jsx', '.json'])),
		alias: merge(get(config, 'resolve.alias', {}), {
			src: path.resolve(__dirname, './src'),
			components: path.resolve(__dirname, './src/components'),
			containers: path.resolve(__dirname, './src/containers'),
			hooks: path.resolve(__dirname, './src/hooks'),
			libs: path.resolve(__dirname, './src/libs'),
			pages: path.resolve(__dirname, './src/pages'),
			assets: path.resolve(__dirname, './src/assets'),
			store: path.resolve(__dirname, './src/store'),
			// i18n: path.resolve(__dirname, './src/i18n'),
			// jest: path.resolve(__dirname, './.jest'),
			// storybook: path.resolve(__dirname, './.storybook'),
		}),
	}),
	plugins: get(config, 'plugins', []).concat([
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				configFile: path.resolve(__dirname, './tsconfig.json'),
			},
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
		new Dotenv({
			safe: true,
			systemvars: true,
		}),
	]),
})
