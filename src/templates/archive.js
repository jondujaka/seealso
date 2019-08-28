import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ProjectsList from "../components/ProjectsList.js";

export default props => {
	const projectsData = useStaticQuery(graphql`
		query {
			# Get all the projects
			allMarkdownRemark(
				filter: {frontmatter: { templateKey: { eq: "project" }}}
			) {
				edges {
					node {
						frontmatter {
							title
							templateKey
							team
						}
						html
					}
				}
			}
		}
	`);

	const items = projectsData.allMarkdownRemark.edges;
	return (
		<>
			<h2>Archive page</h2>
			<ProjectsList items={items} />
		</>
	);
};
