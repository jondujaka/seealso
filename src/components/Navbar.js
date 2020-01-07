import React, { useState } from 'react';
import { Link } from 'gatsby';

const Navbar = ({ showFilter, pagination }) => {
	const [filterState, setFilterState] = useState(false);
	const { next, previous } = pagination ? pagination : false;

	return (
		<nav className="navbar">
			<ul className="main-nav">
				<li className="mr-2 nav-item">
					<Link
						to="/"
					  	activeClassName="active"
					>
						Home
					</Link>
				</li>
				<li className="mr-2 nav-item">
					<Link
						to="/archive"
						activeClassName="active"
						partiallyActive={true}
					>
						Archive
					</Link>
				</li>
				<li className="mr-2 nav-item">
					<Link
						to="/info"
						activeClassName="active"
						partiallyActive={true}
					>
						Info
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
