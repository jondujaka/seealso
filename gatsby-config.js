module.exports = {
	siteMetadata: {
		title: 'See Also portfolio',
		description: 'See also portfolio website'
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sass',
		{
			// keep as first gatsby-source-filesystem plugin for gatsby image support
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/static/img`,
				name: 'uploads'
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/pages`,
				name: 'pages'
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/img`,
				name: 'images'
			}
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-transformer-remark',

		},
		{
			resolve: 'gatsby-plugin-netlify-cms',
			options: {
				modulePath: `${__dirname}/src/cms/cms.js`
			}
		},
		{
			resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
			options: {
				develop: true, // Activates purging in npm run develop
				purgeOnly: ['/all.sass'] // applies purging only on the bulma css file
			}
		}, // must be after other CSS plugins
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: `See Also Studio`,
				short_name: `See Also`,
				description: `The most amazing design studio`,
				lang: `en`,
				display: `standalone`,
				icon: `${__dirname}/static/img/icon.png`,
				start_url: `/`,
				background_color: `#FFF`,
				theme_color: `#000`
			}
		},
		'gatsby-plugin-netlify' // make sure to keep it last in the array
	]
};
