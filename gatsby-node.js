const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;

    // Get all projects and create pages with each of them
    const projectsData = await graphql(`
        {
            allMarkdownRemark(
                limit: 1000
                filter: { frontmatter: { templateKey: { eq: "project" } } }
            ) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            templateKey
                        }
                    }
                }
            }
        }
    `);

    if (projectsData.errors) {
        throw projectsData.errors;
    }

    const projects = projectsData.data.allMarkdownRemark.edges;

    projects.forEach((edge, index) => {
        const previous =
            index === projects.length - 1 ? null : projects[index + 1].node;
        const next = index === 0 ? null : projects[index - 1].node;

        const id = edge.node.id;
        const slug = _.kebabCase(edge.node.frontmatter.title);

        createPage({
            path: slug,
            tags: edge.node.frontmatter.tags,
            component: path.resolve(
                `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
            ),
            // additional data can be passed via context
            context: {
                slug,
                id,
                next,
                previous
            }
        });
    });

    // Create ARCHIVE page
    createPage({
        path: 'archive',
        component: path.resolve(`src/templates/archive.js`)
    });

    // Create HOME page
    createPage({
        path: '/',
        component: path.resolve(`src/templates/index-page.js`)
    });

    const teamMembersData = await graphql(`
        {
            allMarkdownRemark(
                limit: 1000
                filter: { frontmatter: { templateKey: { eq: "team-member" } } }
            ) {
                edges {
                    node {
                        frontmatter {
                            templateKey
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
    `);

    if (teamMembersData.errors) {
        throw teamMembersData.errors;
    }

    const teamMembers = teamMembersData.data.allMarkdownRemark.edges;

    teamMembers.forEach((edge, index) => {
        const id = edge.node.id;

        createPage({
            path: edge.node.fields.slug,

            component: path.resolve(
                `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
            ),

            // additional data can be passed via context
            context: {
                member: edge.node.frontmatter.fullName,
                slug: edge.node.fields.slug,
                id
            }
        });
    });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;
    fmImagesToRelative(node); // convert image paths for gatsby images

    if (node.internal.type === `MarkdownRemark`) {

    	const value = node.frontmatter.templateKey === 'team-member'
    				? _.kebabCase(node.frontmatter.fullName)
    				: _.kebabCase(node.frontmatter.title);

        createNodeField({
            name: `slug`,
            node,
            value
        });
    }
};
