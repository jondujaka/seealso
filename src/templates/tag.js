import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout.js';
import ProjectsList from '../components/ProjectsList.js';

const tag = ({ pageContext, data }) => {
    const projects = data.projectsData.edges;

    return (
        <Layout title={`${pageContext.tag} - See Also`}  showFilter={true} showNav={true}>
            <div className="sub-archive">
                <h2>All {pageContext.tag} projects</h2>
                <ProjectsList items={projects} />
            </div>
        </Layout>
    );
};

export default tag;

export const data = graphql`
    query ProjectsByTag($tag: [String]) {
        projectsData: allMarkdownRemark(
            filter: { frontmatter: { tags: { in: $tag } } }
        ) {
            edges {
				node {
					frontmatter {
						title
						templateKey
						team
						tags
						images {
							childImageSharp {
		                        fixed(width: 200) {
		                        	...GatsbyImageSharpFixed_noBase64
		                        }
		                    }
						}
					}
					fields {
						slug
					}
					html
				}
			}
        }
    }
`;
