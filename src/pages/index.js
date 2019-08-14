import React from 'react';
import Layout from '../components/layout';
import styled from "styled-components";

let test = '';

class Index extends React.Component {

	state = {
		position : {
			horizontal: 0,
			vertical: 0,
			size: 0,
			opacity: 0
		}
	}

	componentDidMount() {
		this.setState(
			{
				position: {
					horizontal: Math.floor(Math.random() * (70 - 10) + 10),
					vertical: Math.floor(Math.random() * (40 - 10) + 10),
					size: Math.random() * (7 - 1) + 1,
					opacity: 1
				}
			}
		);
	}

	render() {

		const { position } = this.state;

		const Ghost = styled.h1`
			text-align: right;
		  display: block;
		  margin-right: ${position.horizontal}vw;
		  margin-top: ${position.vertical}vh;
		  transition: .2s opacity .4s ease-in-out;
		  font-size: ${position.size}rem;
		  opacity: ${position.opacity}
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

				<Ghost>👻</Ghost>
			);
	}
}

export default Index;