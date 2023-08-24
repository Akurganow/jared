const createWebpackConfig = require('./create-webpack-config')
const webpackConfig = createWebpackConfig({}, { dev: false })

module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'react',
		'react-hooks',
		'formatjs',
		'import'
	],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
	],
	root: true,
	env: {
		node: true,
		es6: true,
		browser: true,
		jest: true,
		webextensions: true
	},
	rules: {
		'no-tabs': [0],
		'block-spacing': [2, 'always'],
		'object-curly-spacing': [2, 'always'],
		'semi': [2, 'never'],
		'quotes': ['error', 'single'],
		'indent': [2, 'tab'],
		'react/jsx-indent': [2, 'tab', { indentLogicalExpressions: true }],
		'react/jsx-indent-props': [2, 'tab'],
		'react/display-name': [0, 0],
		'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
		'react/react-in-jsx-scope':[0],
		'import/no-unresolved': [2, { commonjs: true, amd: true }],
		'import/extensions': [2, 'never', { ignorePackages: true, pattern: { 'json': 'always' } }],
		'import/no-extraneous-dependencies': [
			2,
			{
				'devDependencies': true,
				'optionalDependencies': true,
				'peerDependencies': true
			}
		],
		'import/no-named-default': [0],
		'import/prefer-default-export': [0],
		'import/namespace': [2, { allowComputed: true }],
		'import/named': [0],
		'import/order': [
			'error',
			{
				'groups': [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
					'object',
					'type'
				]
			}
		]
	},
	'settings': {
		'import/extensions': ['.json', '.js', '.jsx', '.ts', '.tsx', '.d.ts'],
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx']
		},
		'import/resolver': {
			'typescript': true,
			'node': true,
			'webpack': {
				'config': webpackConfig,
				'env': {
					'NODE_ENV': 'production',
					'production': true
				}
			}
		},
		'react': {
			'createClass': 'createReactClass',
			'pragma': 'React',
			'fragment': 'Fragment',
			'version': 'detect',
			'flowVersion': '0.53'
		},
	}
}
