import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout.js';
import ProjectsList from '../components/ProjectsList.js';

const teamMember = ({ pageContext, data }) => {
    const projects = data.projectsData.edges;

    return (
        <Layout title={`${pageContext.member} - See Also`} filter={true}>
            <div className="member-archive">
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
                        team
                        title
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;
