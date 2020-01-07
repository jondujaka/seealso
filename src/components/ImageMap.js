import React, { useRef } from 'react';
import { navigate } from "gatsby"
import Img from 'gatsby-image';
import SVG from 'react-inlinesvg';

const ImageMap = ({images}) => {

	const overlayRef = useRef();
	const id = `overlay-${Math.random()}`;

	const setLinks = () => {
		const overlay = document.getElementById(id);
		const groups = overlay.getElementsByTagName('g');

		[...groups].map(item => {
			item.addEventListener(
				'click',
				() => openProject(item.id)
			)
		});

	}

	return (
		<div className="home-image">
			<SVG id={id} onLoad={()=>setLinks()} className="svg-overlay" ref={overlayRef} src={images.svg.publicURL} />
			<Img fluid={images.mainImage.childImageSharp.fluid} />
		</div>
	);
}

const openProject = (path) => {
	navigate(`/${path}`);
}


export default ImageMap;
