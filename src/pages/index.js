import React from 'react';
import Layout from '../components/layout';
import styled from "styled-components";


class Index extends React.Component {

	render() {
		const Ghost = styled.h1`
			text-align: right;
		  display: block;
		  margin-right: ${window.randH}vw;
		  margin-top: ${window.randV}vh;
		  font-size: ${window.randF}rem;
		`;

		const data = {
			site : {
				siteMetadata : {
					title: "👻"
				}
			}
		}
		const siteTitle = data.site.siteMetadata.title;
		return (

				<Ghost>👻</Ghost>
			);
	}
}

export default Index;