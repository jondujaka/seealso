import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/Layout';
import IndexPageTeaser from '../components/IndexPageTeaser';
import Home from '../components/Home';

const callback = () => {
	console.log('Snap!');
};


export const IndexPageTemplate = ({ images, context }) => {
	console.log(images);
	return context.ENV === 'production' ? (
		<IndexPageTeaser />
	) : (
		<Home images={images} />
	);
};



const IndexPage = ({ data, pageContext }) => {
	const imagesData = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
				}
			}

			# Get the home-page
			markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
				frontmatter {
					title
					templateKey
					date
					homeImages {
						mainImage {
							childImageSharp {
								fluid(maxWidth: 2540, quality: 100) {
									...GatsbyImageSharpFluid_tracedSVG
								}
							}
						}
						svg {
							publicURL
						}
					}
				}
			}
		}
	`);

	const imagesArray = imagesData.markdownRemark.frontmatter.homeImages;

	if (pageContext.ENV === 'production') {
		return <IndexPageTemplate images={imagesArray} context={pageContext} />;
	} else {
		return (
			<Layout showNav={true}>
				<IndexPageTemplate images={imagesArray} context={pageContext} />
			</Layout>
		);
	}
};

export default IndexPage;
