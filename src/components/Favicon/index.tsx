import { ImgHTMLAttributes, useMemo } from 'react'

interface FaviconProps extends ImgHTMLAttributes<HTMLImageElement>{
	href: string,
	size: number,
}
export default function ({ href, size, ...props }: FaviconProps) {
	const faviconUrl = useMemo((): string => {
		const url = new URL(chrome.runtime.getURL('/_favicon/'))
		url.searchParams.set('pageUrl', href)
		url.searchParams.set('size', size.toString())

		return url.toString()
	}, [href, size])

	return <img src={faviconUrl} width={size} height={size} {...props}/>

}
