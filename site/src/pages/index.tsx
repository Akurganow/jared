import 'modern-css-reset'
import * as React from 'react'
import { graphql } from 'gatsby'
import type { HeadFC, PageProps } from 'gatsby'
import '../styles/common.css'

interface QueryData {
	markdownRemark: {
		html: string
		frontmatter: {
			title: string
		}
	}
}

const IndexPage: React.FC<PageProps<QueryData>> = ({ data }) => {
	const post = data.markdownRemark

	return <main dangerouslySetInnerHTML={{ __html: post.html }} />
}

export default IndexPage

export const Head: HeadFC = () => <>
	<title>Jared Web Extension</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet" />
</>

export const query = graphql`
	query {
		markdownRemark(fileAbsolutePath: { regex: "/src/content/home.md/" }) {
			html
			frontmatter {
				title
				date
			}
		}
	}
`
