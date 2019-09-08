import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import SVG from 'react-inlinesvg';
import Layout from '../components/Layout';

export const IndexPageTemplate = ({ images }) => {
	const renderImage = (img, i) => {
		return (
			<div key={i} className="home-image">
				<SVG className="svg-overlay" src={img.svg.publicURL} />
				<Img fluid={img.mainImage.childImageSharp.fluid} />
			</div>
		);
	};

	return (
		<div className="images-wrapper">
			{images && images.map((img, index) => renderImage(img, index))}
		</div>
	);
};

const IndexPage = ({ data }) => {
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
					image {
						mainImage {
							childImageSharp {
								fluid(maxWidth: 2540) {
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

	const imagesArray = imagesData.markdownRemark.frontmatter.image;

	return (
		<Layout showNav={true}>
			<IndexPageTemplate images={imagesArray} />
		</Layout>
	);
};

export default IndexPage;
