import React from 'react';
import Layout from '../components/layout';
import styled from "styled-components";

let test = '';

class Index extends React.Component {

	state = {
		position : {
			horizontal: Math.floor(Math.random() * (70 - 10) + 10),
			vertical: Math.floor(Math.random() * (70 - 10) + 10)
		}
	}

	componentDidMount() {
		// this.setState({ test: 'bbb' })
	}

	render() {

		const { position } = this.state;

		const Ghost = styled.h1`
			text-align: right;
		  display: block;
		  margin-right: ${position.horizontal}vw;
		  margin-top: ${position.vertical}vh;
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