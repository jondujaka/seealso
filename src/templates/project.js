import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet
}) => {
  const PostContent = contentComponent || Content;


  return (
	<section className="section">
	  <h2>{title}</h2>
	  <HTMLContent content={content} />
	</section>
  )
}

const BlogPost = ({pageContext, data}) => {

	const projectData = data.projectContent;

	const {next, previous} = pageContext;

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

  return (
	<Layout>
	  <BlogPostTemplate title={projectData.frontmatter.title} content={projectData.html}/>
	  {pagination()}
	</Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
	markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

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
    }
`;


