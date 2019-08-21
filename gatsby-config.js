module.exports = {
	siteMetadata: {
		title: `SEEALSO Studio`,
		author: `Jon Dujaka`,
		description: `Portfolio`,
		siteUrl: `https://seealso.info/`,
		// social: {
		// 	twitter: `kylemathews`,
		// },
	},
	plugins: [
		`gatsby-plugin-netlify-cms`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/projects`,
				name: `project`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/assets`,
				name: `assets`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/team-members`,
				name: 'team-members'
			}
		},
		{
	    resolve: `gatsby-plugin-favicon`,
	    options: {
	      logo: "./static/favicon.png",
	    }
	  },
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 590,
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					`gatsby-remark-prismjs`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
				],
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				//trackingId: `ADD YOUR TRACKING ID HERE`,
			},
		},
		`gatsby-plugin-feed`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `See Also Portfolio`,
				short_name: `SeeAlso`,
				start_url: `/`,
				background_color: `#ffffff`,
				theme_color: `#000`,
				display: `minimal-ui`,
				icon: `content/assets/favicon.png`,
			},
		},
		`gatsby-plugin-offline`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-sass`,
		`gatsby-plugin-styled-components`
	],
};
