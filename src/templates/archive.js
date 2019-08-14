import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Filter from '../components/filter';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default props => {

	// Get all projects
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
				}
			}
			allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
				edges {
					node {
						excerpt
						fields {
							slug
						}
						frontmatter {
							date(formatString: "MMMM DD, YYYY")
							title
							description
							team
						}
					}
				}
			}
		}
	`);

	const siteTitle = data.site.siteMetadata.title;
	const posts = data.allMarkdownRemark.edges;
	const teamMembers = props.pageContext.teamMembers


	const listPosts = posts.map((post, index) => {
		const title = post.node.frontmatter.title;
		const link = post.node.fields.slug;

		return (
			<li key={index}>
				<a href={link}> {title}</a>
			</li>
		);

	});

	return (
		<Layout location={props.location} title={siteTitle}>
      <SEO title="Archive" />
			<Filter items={teamMembers}/>
			<ul>
				{listPosts}
			</ul>
		</Layout>	
	);
}