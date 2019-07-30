import React from 'react';
import Layout from '../components/layout';

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

				<h1>👻</h1>
			);
	}
}

export default Index;