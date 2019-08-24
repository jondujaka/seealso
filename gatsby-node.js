const _ = require('lodash');
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { fmImagesToRelative } = require(`gatsby-remark-relative-images`);

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const project = path.resolve(`./src/templates/project.js`);

    const postsData = await graphql(
        `
            {
                allMarkdownRemark(
                    sort: { fields: [frontmatter___date], order: DESC }
                    limit: 1000
                    filter: { frontmatter: { date: { ne: null } } }
                ) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                                team
                                date
                            }
                        }
                    }
                }
            }
        `
    );

    if (postsData.errors) {
        throw postsData.errors;
    }

    const teamMembersData = await graphql(
        `
            {
                allMarkdownRemark(
                    filter: { frontmatter: { fullName: { ne: null } } }
                ) {
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
        `
    );

    if (teamMembersData.errors) {
        throw teamMembersData.errors;
    }

    const posts = postsData.data.allMarkdownRemark.edges;
    const teamMembers = teamMembersData.data.allMarkdownRemark.edges;

    const archive = path.resolve(`./src/templates/archive.js`);

    createPage({
        component: archive,
        path: `/archive`
    });

    // Create pages for each post
    posts.forEach((post, index) => {
        const previous =
            index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;

        createPage({
            path: post.node.fields.slug,
            component: project,
            context: {
                slug: post.node.fields.slug,
                next,
                previous
            }
        });
    });

    // Create pages for each member
    teamMembers.forEach((member, index) => {
        createPage({
            path: member.node.fields.slug,
            component: project,
            context: {
                slug: member.node.fields.slug
            }
        });
    });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    fmImagesToRelative(node); // convert image paths for gatsby images

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode });
        createNodeField({
            name: `slug`,
            node,
            value
        });
    }
};
