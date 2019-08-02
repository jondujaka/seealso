import React from 'react';
import Layout from '../components/layout';
import styled from "styled-components";

const Ghost = styled.h1`
	text-align: right;
  display: block;
  margin-right: 20vw;
  margin-top: 30vh;
`


class Index extends React.Component {

	render() {
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