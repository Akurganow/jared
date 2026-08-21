// Мок svg-спрайта для Jest: повторяет форму экспорта svg-sprite-loader (см. src/custom.d.ts)
export default {
	id: 'svg-mock',
	viewBox: '0 0 24 24',
	content: '<symbol id="svg-mock" viewBox="0 0 24 24"></symbol>',
	node: null as unknown as SVGSymbolElement,
}
