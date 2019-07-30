import React from 'react';
import { Link } from 'gatsby';

class Layout extends React.Component {
	render() {
		const { location, title, children } = this.props;
		const rootPath = `${__PATH_PREFIX__}/`;
		let header;
		console.log(children);

		header = (
			<h3>
				<Link to={`/archive`}>Archive</Link>
			</h3>
			<h3>
				<Link to={`/info`}>Info</Link>
			</h3>
		);

		return (
			<div>
				<header>{header}</header>
				<main>{children}</main>
				<footer>
					© {new Date().getFullYear()}, Built with
					{` `}
					<a href="https://www.gatsbyjs.org">Gatsby</a>
				</footer>
			</div>
		);
	}
}

export default Layout;
