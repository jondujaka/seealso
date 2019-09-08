import React from 'react';
import { get } from 'lodash';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import RenderHtml from '../components/RenderHtml';
import Tags from '../components/Tags';

export const ProjectTemplate = ({ content, members }) => {

    const {
        title,
        images,
        team,
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
                <div className="project-images pr-1">
                    {images &&
                        images.map((img, i) => (
                            <Img className={i !== 0 ? 'mt-2' : ''} key={i} fluid={img.childImageSharp.fluid} />
                        ))}
                </div>
                <div className="project-content pl-1">
                    {RenderHtml(content.htmlAst)}

                    <div className="ml-1 mt-2">
                    	<Tags tags={tags} />
                    </div>

                    <div className="ml-1">
                    	{/*<RenderHtml content={description} />*/}
                    </div>

                    <div className="project-info mt-2">
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
            showNav={true}
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
            htmlAst
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
