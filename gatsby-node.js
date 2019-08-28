const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions;

	// Get all projects and create pages with each of them
	const projectsData = await graphql(`
		{
			allMarkdownRemark(
				limit: 1000,
				filter: { frontmatter: { date: { ne: null } } }
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

		createPage({
			path: edge.node.fields.slug,
			tags: edge.node.frontmatter.tags,
			component: path.resolve(
				`src/templates/${String(
					edge.node.frontmatter.templateKey
				)}.js`
			),
			// additional data can be passed via context
			context: {
				slug: edge.node.fields.slug,
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

		// // Tag pages:
		// let tags = [];
		// // Iterate through each post, putting all found tags into `tags`
		// posts.forEach(edge => {
		// 	if (_.get(edge, `node.frontmatter.tags`)) {
		// 		tags = tags.concat(edge.node.frontmatter.tags);
		// 	}
		// });
		// // Eliminate duplicate tags
		// tags = _.uniq(tags);

		// // Make tag pages
		// tags.forEach(tag => {
		// 	const tagPath = `/tags/${_.kebabCase(tag)}/`;

		// 	createPage({
		// 		path: tagPath,
		// 		component: path.resolve(`src/templates/tags.js`),
		// 		context: {
		// 			tag
		// 		}
		// 	});
		// });
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
