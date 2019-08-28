import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import ProjectsList from '../components/ProjectsList.js';

const teamMember = ({pageContext, data}) => {

    const member = pageContext.member;


    const projects = data.projectsData.edges;

    return (
        <>
            <h2>Member page</h2>
            <ProjectsList items={projects} />
        </>
    );
}

export default teamMember;

export const data = graphql`
    query ProjectsByTeamMember($member: [String]) {
      projectsData: allMarkdownRemark(
            filter: {frontmatter: { team: { in: $member} } }
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
