declare module 'jest-webextension-mock'

declare module '*.css'

// firefox-подобные браузеры кладут webextension API в window.browser
interface Window {
	browser?: typeof browser
}

declare module '*.module.css' {
	const classes: { [key: string]: string }
	export default classes
}

declare module '*.svg' {
	const svg: {
		id: string
		viewBox: string
		content: string
		node: SVGSymbolElement
	}
	export default svg
}
