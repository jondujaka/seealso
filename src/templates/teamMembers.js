import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

class MemberRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    const member = this.props.pageContext.member;

    return (
      <Layout>
        <h1>{member}</h1>
      </Layout>
    )
  }
}

export default MemberRoute

export const MemberRouteQuery = graphql`
  query MemberRoute($member: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { team: { in: [$member] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`