import React, { useState } from 'react';
import { get } from 'lodash';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import RenderHtml, {RenderHtmlNode} from '../components/RenderHtml';
import Tags from '../components/Tags';
import Magnifier from '../components/Magnifier';

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

    console.log(members);

    members.push({
    	node: {
    		frontmatter: {
    			fullName: 'Jon Dujaka'
    		},
    		fields: {
    			slug: '/jon-dujaka'
    		}
    	}
    });

    // team.push("Zuzana Konstelanska");


    const renderMember = (member, i) => {
    	const name = member.node.frontmatter.fullName;
    	if(team && !team.includes(name)) return;
    	const showAnd = members.length === 2;


    	return (
    		<>
	    		<span>
	    			{i !== 0 && showAnd && ' and '}
		    		{i!== 0 && !showAnd && ', '}
		    	</span>
	    		<a href="#" key={'asd'}>
			    	{name}
		    	</a>
		    </>
    	);



    }


    return (
        <>
            <h1 className="project-title">{title}</h1>
            <div className="single-project">
                <div className="project-images pr-2">
                    {images &&
                        images.map((img, i) => (
                        	<Magnifier key={i} classes={i !== 0 ? 'mt-4' : ''} image={img.childImageSharp} />
                        ))}
                </div>
                <div className="project-content pl-1">
                    {RenderHtmlNode(content.htmlAst)}

                    <div className="ml-2 mt-4">
                    	<Tags tags={tags} />
                    </div>

                    <div className="ml-2">
                    	<RenderHtml content={description} />
            		</div>

                    <div className="project-info mt-4">
                        <ul>
                            <li>
                                <span className="label">Client </span>
                                <span>{client}</span>
                            </li>
                            <li>
                                <span className="label">Team </span>
                                <div>
	                                {team && members && members.map((member, i) => (
	                                		renderMember(member, i)
	                                	)
	                                )}
	                                </div>
                            </li>
                            <li>
                                <span className="label">Year </span>
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
                        fluid(maxWidth: 1200) {
                            ...GatsbyImageSharpFluid_tracedSVG
                        }
                        fixed(width: 2400) {
                        	...GatsbyImageSharpFixed_noBase64
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
