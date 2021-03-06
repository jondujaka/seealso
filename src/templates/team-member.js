import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout.js';
import ProjectsList from '../components/ProjectsList.js';

const teamMember = ({ pageContext, data }) => {
    const projects = data.projectsData.edges;

    return (
        <Layout title={`${pageContext.member} - See Also`}  showFilter={true} showNav={true}>
            <div className="sub-archive">
                <h2>Projects by {pageContext.member}</h2>
                <ProjectsList items={projects} />
            </div>
        </Layout>
    );
};

export default teamMember;

export const data = graphql`
    query ProjectsByTeamMember($member: [String]) {
        projectsData: allMarkdownRemark(
            filter: { frontmatter: { team: { in: $member } } }
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
