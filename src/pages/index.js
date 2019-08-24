import React, { useState, useEffect } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout';
import styled from 'styled-components';
import SEO from '../components/seo';
import SVG from 'react-inlinesvg';

export default props => {
	const imagesData = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
				}
			}

			# Get only the images
			markdownRemark(id: {eq: "146ee6c3-f977-5a25-9e1c-59e828dfef72"}) {
			    frontmatter {
			      cover_image {
			        mainImage{
						childImageSharp {
							fluid(maxWidth: 240, quality: 64) {
								...GatsbyImageSharpFluid
							}
						}
					}
			      }
			    }
			  }
		}
	`);

	const imagesArray =
		imagesData.allMarkdownRemark.nodes[0].frontmatter.cover_image;


	const [position, setPosition] = useState({
		opacity: 0
	});

	const Ghost = styled.h1`
		text-align: right;
		display: block;
		margin-right: ${position.horizontal}vw;
		margin-top: ${position.vertical}vh;
		transition: 0.2s opacity 0.4s ease-in-out;
		font-size: ${position.size}rem;
		opacity: ${position.opacity};
	`;

	const Image = styled.img`
		width: 100%;
		height: auto;
		display: block;
	`;

	const Overlay = styled(SVG)`
		width: 100%;
		position: absolute;
		top:0;
		left:0;
		height: auto;
	`

	const ImageContainer = styled.div`
		position: relative;
		width: 100%:
	`;

	useEffect(() => {
		console.log('effect');
		setPosition({
			horizontal: Math.floor(Math.random() * (70 - 10) + 10),
			vertical: Math.floor(Math.random() * (40 - 10) + 10),
			size: Math.random() * (7 - 1) + 1,
			opacity: 1
		});
	}, []);

	const data = {
		site: {
			siteMetadata: {
				title: '👻 - See Also'
			}
		}
	};

	const renderImage = img => {
		return (
			<ImageContainer>
				<Overlay src={img.svg} />
				<Image src={img.mainImage} />
			</ImageContainer>
		);
	};

	const siteTitle = data.site.siteMetadata.title;

	return (
		<>
			<SEO title="👻" />
			{imagesArray && imagesArray.map(image => renderImage(image))}
		</>
	);
};
