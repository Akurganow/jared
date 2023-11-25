import 'modern-css-reset'
import React from 'react'
import { graphql, PageProps } from 'gatsby'
import '../styles/common.css'

interface PrivacyPolicyQueryData {
	markdownRemark: {
		html: string
		frontmatter: {
			title: string
			date: string
		}
	}
}

const PrivacyPolicy = ({ data }: PageProps<PrivacyPolicyQueryData>) => {
	const post = data.markdownRemark
	const date = new Date(post.frontmatter.date)
	const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
	return (
		<main>
			<h1>{post.frontmatter.title}</h1>
			<p>Last updated: {formattedDate}</p>
			<article dangerouslySetInnerHTML={{ __html: post.html }} />
		</main>
	)
}

export const query = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/src/content/privacy-policy.md/" }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`

export default PrivacyPolicy
