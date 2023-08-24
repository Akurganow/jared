declare module '*.module.css' {
	const classes: { [key: string]: string }
	export default classes
}

declare module '*.svg' {
	const svg: {
		id: string;
		viewBox: string;
		content: string;
		node: SVGSymbolElement;
	}
	export default svg
}
