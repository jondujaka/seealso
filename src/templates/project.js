import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase, get } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import {HTMLContent} from '../components/Content';

export const ProjectTemplate = ({
    content,
    contentComponent,
    description,
    title,
    helmet
}) => {

    return (
        <section className="section">
            <h2>{title}</h2>
            <HTMLContent content={content} />
        </section>
    );
};

const Project = ({ pageContext, data }) => {
    const projectData = data.projectContent;
    
    const membersInfoArray = data.teamMembersInfo.edges;
    
    if(get(projectData.frontmatter, 'team')){
        projectData.frontmatter.team.map((member, index) => {
            membersInfoArray.map(memberInfo => {
                if(member === memberInfo.node.frontmatter.fullName){
                    memberInfo.node.frontmatter.display = true;
                }
            });
        });
    }

    const { next, previous } = pageContext;


    const pagination = () => {
        const prevButton = (
            <li>
                <Link to={previous && previous.fields.slug} rel="prev">
                    ← {previous && previous.frontmatter.title}
                </Link>
            </li>
        );

        const nextButton = (
            <li>
                <Link to={next && next.fields.slug} rel="next">
                    {next && next.frontmatter.title} →
                </Link>
            </li>
        );

        return (
            <ul>
                {previous && prevButton}
                {next && nextButton}
            </ul>
        );
    };
    
    const displayMember = (member, i) => {
        return (
            <a href={member.node.fields.slug} key={i}>{member.node.frontmatter.fullName}</a>
        )
    }


    return (
        <Layout>
            <ProjectTemplate
                title={projectData.frontmatter.title}
                content={projectData.html}
            />
            {membersInfoArray 
                && membersInfoArray.map((member, i) => 
                member.node.frontmatter.display && displayMember(member, i))
            }
            {pagination()}
        </Layout>
    );
};

export default Project;

export const data = graphql`
    query ProjectBySlug($slug: String!) {
        projectContent: markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
                team
            }
        }
        teamMembersInfo: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "team-member"}}}) {
            edges {
                node {
                    frontmatter {
                        fullName
                        link
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;
