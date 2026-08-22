import type { Config } from 'jest'

const config: Config = {
	rootDir: './src',
	preset: 'ts-jest/presets/js-with-ts',

	transform: {
		'^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
	},

	setupFiles: ['./__setups__/chrome.ts'],
	setupFilesAfterEnv: ['./__setups__/testing-library.ts'],

	clearMocks: true,

	collectCoverage: true,
	coverageDirectory: '<rootDir>/.jest/coverage',
	collectCoverageFrom: ['<rootDir>/src/store/*.{ts,tsx}', '<rootDir>/src/utils/*.{ts,tsx}', '!<rootDir>/node_modules/'],

	moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json'],

	moduleNameMapper: {
		'^nanoid$': '<rootDir>/__mocks__/nanoid.ts',
		'\\.svg$': '<rootDir>/__mocks__/svg.ts',
		'\\.css$': 'identity-obj-proxy',
		'^store/(.*)$': '<rootDir>/store/$1',
		'^components/(.*)$': '<rootDir>/components/$1',
		'^containers/(.*)$': '<rootDir>/containers/$1',
		'^utils/(.*)$': '<rootDir>/utils/$1',
		'^pages/(.*)$': '<rootDir>/pages/$1',
		'^types/(.*)$': '<rootDir>/types/$1',
		'^src/(.*)$': '<rootDir>/$1',
		'^storybook-fixtures/(.*)$': '<rootDir>/../.storybook/fixtures/$1',
		'^package$': '<rootDir>/../package.json',
	},

	testMatch: ['**/?(*.)+(spec).[tj]s?(x)'],

	testPathIgnorePatterns: ['/node_modules/', '/dist/', '/packages/', '/playwright/', '/temp/'],

	testEnvironment: 'jsdom',
}

export default config
