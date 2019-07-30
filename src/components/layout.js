import React from 'react';
import { Link } from 'gatsby';
import("../styles/index.scss");

class Layout extends React.Component {
	render() {
		const { location, title, children } = this.props;
		const rootPath = `${__PATH_PREFIX__}/`;
		let header;
		console.log(children);

		header = (
			<nav>	
				<h3>
					<Link to={`/archive`}>Archive</Link>
				</h3>
				<h3>
					<Link to={`/info`}>Info</Link>
				</h3>
			</nav>
		);

		return (
			<div>
				<header>{header}</header>
				<main>{children}</main>
				<footer>
					<a href="#">See Also</a>
				</footer>
			</div>
		);
	}
}

export default Layout;
