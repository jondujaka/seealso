import React from 'react';
import Layout from '../components/layout';
import styled from "styled-components";

let randV = Math.random() * (90 - 10) + 10;
let randH = Math.random() * (90 - 10) + 10;

const Ghost = styled.h1`
	text-align: right;
  display: block;
  margin-right: ${randH}vw;
  margin-top: ${randV}vh;
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