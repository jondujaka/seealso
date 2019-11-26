import React, { useEffect, useState } from 'react';
import Img from 'gatsby-image';
import SVG from 'react-inlinesvg';
import Layout from '../components/Layout';
import ImageMap from '../components/ImageMap';
import ScrollSnap from 'scroll-snap';

const callback = () => {
	console.log('Snap!');
};

const initSnapScroll = () => {
	const element = document.getElementById('scroll-container');
	const snapConfig = {
		scrollSnapDestination: '90% 0%'
	};
	const snapObject = new ScrollSnap(element, snapConfig);
	snapObject.bind(callback);
};

const Home = ({images}) => {
	useEffect(() => {
		initSnapScroll();
	}, []);

	return (
		<div className="h-100 images-wrapper" id="scroll-container">
			{images && images.map((img, i) => <ImageMap key={i} images={img} /> )}
		</div>
	);
};

export default Home;
