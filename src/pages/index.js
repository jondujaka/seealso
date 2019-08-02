import React from 'react';
import Layout from '../components/layout';
import styled from "styled-components";


class Index extends React.Component {
	render() {

		let randV = Math.floor(Math.random() * (90 - 10) + 10);
		let randH = Math.floor(Math.random() * (90 - 10) + 10);
		let randF = Math.random() * (7 - 1) + 1;

		const Ghost = styled.h1`
			text-align: right;
		  display: block;
		`

		const data = {
			site : {
				siteMetadata : {
					title: "👻"
				}
			}
		}
		const siteTitle = data.site.siteMetadata.title;
		return (
			<Ghost 
				style={{
					marginRight: `${randH}vw`,
		  		marginTop: `${randV}vh`,
		  		fontSize: `${randF}rem`
		  	}}
		  >
		  	👻
		  </Ghost>	
		);
	}
}

export default Index;