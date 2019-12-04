import React from 'react';
import ImageMap from '../components/ImageMap';

const Home = ({images}) => {
	return (
		<div className="h-100 images-wrapper">
			{images && images.map((img, i) => <ImageMap key={i} images={img} /> )}
		</div>
	);
};

export default Hom
