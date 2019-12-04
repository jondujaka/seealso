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
                            tags
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

    const allTagsArray = [];

    projects.forEach((edge, index) => {
        const previous =
            index === projects.length - 1 ? null : projects[index + 1].node;
        const next = index === 0 ? null : projects[index - 1].node;

        const id = edge.node.id;
        const tags = edge.node.frontmatter.tags;
        const slug = _.kebabCase(edge.node.frontmatter.title);

        // Save all tags from all projects, we will create pages for each later
		if(tags){
			tags.map(tag => allTagsArray.push(tag));
		}

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

    const ENV = process.env.CONTEXT;

    // Create HOME page
    createPage({
        path: '/',
        component: path.resolve(`src/templates/index-page.js`),
        context: {
        	ENV
        }
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
            path: `archive/${edge.node.fields.slug}`,
            component: path.resolve(
                `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
            ),

            // additional data can be passed via context
            context: {
                member: edge.node.frontmatter.fullName,
                slug: `archive/${edge.node.fields.slug}`,
                id
            }
        });
    });

	// This removes duplicates, keeps only unique values
	const allTags = new Set(allTagsArray);

	// Create pages for each tag
	allTags.forEach((tag, id) => {
        createPage({
            path: `archive/${_.kebabCase(tag)}`,
            component: path.resolve(
                `src/templates/tag.js`
            ),
            // additional data can be passed via context
            context: {
                tag,
                slug: `archive/${_.kebabCase(tag)}`,
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
