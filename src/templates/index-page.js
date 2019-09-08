import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';
import SVG from 'react-inlinesvg';
import Layout from '../components/Layout';

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

};

export default IndexPage;
