import React from 'react';
import { Link } from 'gatsby';
// import("../styles/index.scss");
import styled from "styled-components";

const MainWrapper = styled.div`
	font-family: 'OS Sans Affair';
	fonts-size: 1.5rem;
`

const Nav = styled.div`
  background: red;
`

class Layout extends React.Component {
	render() {
		const { location, title, children } = this.props;
		const rootPath = `${__PATH_PREFIX__}/`;
		let header;
		console.log(children);

		header = (
			<Nav>	
				<h3>
					<Link to={`/archive`}>Archive</Link>
				</h3>
				<h3>
					<Link to={`/info`}>Info</Link>
				</h3>
			</Nav>
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
