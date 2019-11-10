import React, { useEffect, useRef } from 'react';
import Img from 'gatsby-image';
import SVG from 'react-inlinesvg';

const ImageMap = ({images}) => {

	const overlayRef = useRef();

	useEffect(() => {
	    setLinks();
	}, []);

	const setLinks = () => {
		const groups = document.querySelector('svg a');
	}

	return (
		<div className="home-image">
			<SVG className="svg-overlay" ref={overlayRef} src={images.svg.publicURL} />
			<Img fluid={images.mainImage.childImageSharp.fluid} />
		</div>
	);
}

export default ImageMap;
