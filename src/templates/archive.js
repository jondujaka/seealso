import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/Layout.js';
import ProjectsList from '../components/ProjectsList.js';

export default props => {
	const projectsData = useStaticQuery(graphql`
		query {
			# Get all the projects
			allMarkdownRemark(
				filter: { frontmatter: { templateKey: { eq: "project" } } }
			) {
				edges {
					node {
						frontmatter {
							title
							templateKey
							team
							tags
						}
						fields {
							slug
						}
						html
					}
				}
			}
		}
	`);

	const items = projectsData.allMarkdownRemark.edges;
	return (
		<Layout title="Archive - See Also" showFilter={true} showNav={true}>
			<div className="archive">
				<ProjectsList items={items} />
			</div>
		</Layout>
	);
};
