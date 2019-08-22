import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';

export default props => {
    const posts = this.props.data.allMarkdownRemark.edges;
    const member = this.props.pageContext.member;

    return (
        <Layout>
            <h1>{member}</h1>
        </Layout>
    );
};
