import React, {useEffect} from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import SVG from 'react-inlinesvg';
import Layout from '../components/Layout';
import ScrollSnap from 'scroll-snap';



const callback = () => {
  console.log('Snap!')
}

const initSnapScroll = () => {
	const element = document.getElementById('scroll-container');
	const snapConfig = {
		scrollSnapDestination: '90% 0%'
	}
	const snapObject = new ScrollSnap(element, snapConfig)
	snapObject.bind(callback)
}

export const IndexPageTemplate = ({ images }) => {

	useEffect(() => {
	    initSnapScroll();
	}, []);

	const renderImage = (img, i) => {
		return (
			<div key={i} className="home-image">
				<SVG className="svg-overlay" src={img.svg.publicURL} />
				<Img fluid={img.mainImage.childImageSharp.fluid} />
			</div>
		);
	};

	console.log(images);
	return (
		<div className="h-100 images-wrapper" id="scroll-container">
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
