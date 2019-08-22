import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

export default props => {
    const project = props.data.postContent;
    const siteTitle = props.data.site.siteMetadata.title;
    const {previous, next} = props.pageContext;
    const allTeam = props.data.teamMembers.edges;
    const team = project.frontmatter.team || [];

    console.log(allTeam);

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
    }
    
    const renderMember = (member, i) => {
        return <span key={i}>{member}</span>;
    }

     return (
            <Layout location={props.location} title={siteTitle}>
                <SEO
                    title={project.frontmatter.title}
                    description={
                        project.frontmatter.description || project.excerpt
                    }
                />
                <h1>{project.frontmatter.title}</h1>
                <p>{project.frontmatter.date}</p>
                {team.map((member, index) => renderMember(member, index))}

                <div dangerouslySetInnerHTML={{ __html: project.html }} />
                <hr />
                {pagination()}
            </Layout>
        );
}


export const data = graphql`
    query ProjectBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        postContent: markdownRemark(fields: { slug: { eq: $slug } }) {
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
        teamMembers: allMarkdownRemark(filter: {frontmatter: {fullName: {ne: null}}}) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        fullName
                        link
                    }
                }
            }
        }
    }
`;


