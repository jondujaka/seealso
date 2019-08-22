import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import styled from 'styled-components';
import SEO from '../components/seo';

export default props => {

	const [position, setPosition] = useState({
		opacity: 0
	});

	const Ghost = styled.h1`
		text-align: right;
	  display: block;
	  margin-right: ${position.horizontal}vw;
	  margin-top: ${position.vertical}vh;
	  transition: .2s opacity .4s ease-in-out;
	  font-size: ${position.size}rem;
	  opacity: ${position.opacity}
	`;

	useEffect(()=>{
		console.log('effect');
		setPosition({
			horizontal: Math.floor(Math.random() * (70 - 10) + 10),
			vertical: Math.floor(Math.random() * (40 - 10) + 10),
			size: Math.random() * (7 - 1) + 1,
			opacity: 1
		})
	}, [])

	const data = {
		site : {
			siteMetadata : {
				title: "👻 - See Also"
			}
		}
	}

	const siteTitle = data.site.siteMetadata.title;

	return (
		<>
      <SEO title="👻" />
			<Ghost>👻</Ghost>
		</>
	);
}
