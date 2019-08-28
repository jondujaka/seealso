import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase, get } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import {HTMLContent} from '../components/Content';

export const ProjectTemplate = ({content, members}) => {

    console.log(content);

    const { 
        title,
        images, 
        tags, 
        description,
        year,
        client
    } = content.frontmatter;

    const displayMember = (member, i) => {
        return (
            <a href={member.node.fields.slug} key={i}>{member.node.frontmatter.fullName}</a>
        )
    }


    return (
        <>
            <h1 className="project-title">{title}</h1>
            <div className="single-project">
                <div className="project-images">
                    {images && 
                        images.map((img, i) => 
                            <Img key={i} fluid={img.childImageSharp.fluid} />
                        )
                    }
                </div>
                <div className="project-content">

                    <HTMLContent content={content.html} />

                    <div className="project-technical-info">
                        {tags && tags.map((tag, i) => <span key={i}>{tag}</span>)}
                        <HTMLContent content={description} />
                    </div>

                    <div className="project-info">
                        <ul>
                            <li>
                                <span>Client</span>
                                <span>{client}</span>
                            </li>
                            <li>
                                <span>Team</span>
                                {members 
                                    && members.map((member, i) => 
                                        member.node.frontmatter.display && displayMember(member, i))
                                }
                            </li>
                            <li>
                                <span>Year</span>
                                <span>{year}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

const Project = props => {

    const projectData = props.data.projectContent;
    const membersInfoArray = props.data.teamMembersInfo.edges;
    
    if(get(projectData.frontmatter, 'team')){
        projectData.frontmatter.team.map((member, index) => {
            membersInfoArray.map(memberInfo => {
                if(member === memberInfo.node.frontmatter.fullName){
                    memberInfo.node.frontmatter.display = true;
                }
            });
        });
    }

    const { next, previous } = props.pageContext;


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
            <ul className="pagination">
                {previous && prevButton}
                {next && nextButton}
            </ul>
        );
    };

    return (
        <Layout 
            title={`${projectData.frontmatter.title} - See Also`}
            showFilter={true}
        >
            <ProjectTemplate
                content={projectData}
                members={membersInfoArray}
            />
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
                client
                year
                tags
                images {
                    childImageSharp {
                        fluid(maxWidth: 1600) {
                            ...GatsbyImageSharpFluid_tracedSVG
                        }
                    }
                }
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
