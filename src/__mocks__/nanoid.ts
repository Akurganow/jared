// CJS-шим nanoid для Jest: боевой nanoid@6 — ESM-only.
// Поведение (uid из 21 url-safe символа) совпадает по контракту
const alphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'

export const nanoid = (size = 21) => {
	let id = ''

	for (let i = 0; i < size; i++) {
		id += alphabet[Math.floor(Math.random() * alphabet.length)]
	}

	return id
}
