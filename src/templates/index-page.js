import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import SVG from 'react-inlinesvg';
import Layout from '../components/Layout';
import IndexPageTeaser from '../components/IndexPageTeaser';
import ImageMap from '../components/ImageMap';
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

export const IndexPageTemplate = ({ images, context }) => {

	useEffect(() => {
	    initSnapScroll();
	}, []);

	console.log('env: ');console.log(context);
	console.log('-------')


	if(context.ENV === 'production'){
		return <IndexPageTeaser/>
	} else {
		return(
			<div className="h-100 images-wrapper" id="scroll-container">
				{images && images.map((img, index) => <ImageMap key={index} images={img} />)}
			</div>
		)
	}
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
				}
			}
		}
	`);

	const imagesArray = imagesData.markdownRemark.frontmatter.image;

	return (
		{pageContext.ENV === 'production' ? (
			<Layout showNav={true}>
				<IndexPageTemplate images={imagesArray} context={pageContext} />
			</Layout>
			) : (
			<IndexPageTemplate images={imagesArray} context={pageContext} />
			)
		}
	);
};

export default IndexPage;
