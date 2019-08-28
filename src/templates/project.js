import React from 'react';
import { get } from 'lodash';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import { HTMLContent } from '../components/Content';

export const ProjectTemplate = ({ content, members }) => {
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
        return <Link to={member.node.fields.slug} key={i} />;
    };

    return (
        <>
            <h1 className="project-title">{title}</h1>
            <div className="single-project">
                <div className="project-images">
                    {images &&
                        images.map((img, i) => (
                            <Img key={i} fluid={img.childImageSharp.fluid} />
                        ))}
                </div>
                <div className="project-content">
                    <HTMLContent content={content.html} />

                    <div className="project-technical-info">
                        {tags &&
                            tags.map((tag, i) => <span key={i}>{tag}</span>)}
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
                                {members &&
                                    members.map(
                                        (member, i) =>
                                            member.node.frontmatter.display &&
                                            displayMember(member, i)
                                    )}
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

    if (get(projectData.frontmatter, 'team')) {
        projectData.frontmatter.team.forEach((member, index) => {
            membersInfoArray.forEach(memberInfo => {
                if (member === memberInfo.node.frontmatter.fullName) {
                    memberInfo.node.frontmatter.display = true;
                }
            });
        });
    }

    const pagination = {
        next: props.pageContext.next,
        previous: props.pageContext.previous
    };

    return (
        <Layout
            title={`${projectData.frontmatter.title} - See Also`}
            showFilter={false}
            pagination={pagination}
        >
            <ProjectTemplate content={projectData} members={membersInfoArray} />
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
        teamMembersInfo: allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "team-member" } } }
        ) {
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
