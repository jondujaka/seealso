import React, {useEffect} from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import SVG from 'react-inlinesvg';
import Layout from '../components/Layout';
import ScrollSnap from 'scroll-snap';





const callback = () => {
  console.log('Snap!')
}

const exportFunc = null;
if(process.env.CONTEXT === 'production'){
	exportFunc = IndexPage;
} else {
	exportFunc = IndexPageTeaser;
}

const initSnapScroll = () => {
	const element = document.getElementById('scroll-container');
	const snapConfig = {
		scrollSnapDestination: '90% 0%'
	}
	const snapObject = new ScrollSnap(element, snapConfig)
	snapObject.bind(callback)
}

const IndexPageTeaser = ({data}) => {
	const IndexPage = ({ data }) => {
		const [position, setPosition] = useState({
		opacity: 0
	});

	useEffect(() => {
		setPosition({
			horizontal: Math.floor(Math.random() * (70 - 10) + 10),
			vertical: Math.floor(Math.random() * (40 - 10) + 10),
			size: Math.random() * (7 - 1) + 1,
			opacity: 1
		});
	}, []);

	const Ghost = styled.h1`
		text-align: right;
		display: block;
		margin-right: ${position.horizontal}vw;
		margin-top: ${position.vertical}vh;
		transition: 0.2s opacity 0.4s ease-in-out;
		font-size: ${position.size}rem;
		opacity: ${position.opacity};
	`;

	return (
		<Layout showNav={false} title={`👻 - See Also`}>
			<Ghost>
				<span role="img">👻</span>
			</Ghost>
		</Layout>
	);
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

export default exportFunc;
