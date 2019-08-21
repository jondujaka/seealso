import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Filter from '../components/filter';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Posts from '../components/posts';

export default props => {
	// Get all projects
	const data = useStaticQuery(graphql`
		query {

			site {
				siteMetadata {
					title
				}
			}
			
			# Get only the posts (only posts have date field, and sort by date)
			allMarkdownRemark(
				sort: { fields: [frontmatter___date], order: DESC },
				filter: {frontmatter: {date: {ne: null}}}
			) {
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
						}
					}
				}
			}

			# Get only the team-members
			allFile(filter: { sourceInstanceName: { eq: "team-members" } }) {
				edges {
					node {
						id
						name
						childMarkdownRemark {
							fields {
								slug
							}
							frontmatter {
								firstName
								lastName
								link
							}
						}
					}
				}
			}
		}
	`);

	const siteTitle = data.site.siteMetadata.title;
	const posts = data.allMarkdownRemark.edges;
	const team = data.allFile.edges;

	let parsedMembers = [];

	team.map(member =>{
		const front = member.node.childMarkdownRemark.frontmatter;
		parsedMembers.push({
			fullName: `${front.firstName} ${front.lastName}`,
			slug: member.node.childMarkdownRemark.fields.slug
		});
	});

	return (
		<Layout location={props.location} title={siteTitle}>
			<SEO title="Archive" />
			<Filter items={parsedMembers} />	
			<Posts posts={posts} />
		</Layout>
	);
};
