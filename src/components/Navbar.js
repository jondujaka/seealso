import React, { useState } from 'react';
import { Link } from 'gatsby';

const Navbar = ({ showFilter, pagination }) => {
	const [filterState, setFilterState] = useState(false);
	const { next, previous } = pagination ? pagination : false;

	return (
		<nav className="navbar">
			<ul className="main-nav">
				<li className="mr-2">
					<Link
						to="/"
					  	activeClassName="active"
					>
						Home
					</Link>
				</li>
				<li className="mr-2">
					<Link
						to="/archive"
						activeClassName="active"
						partiallyActive={true}
					>
						Archive
					</Link>
				</li>
				<li className="mr-2">
					<Link
						to="/info"
						activeClassName="active"
						partiallyActive={true}
					>
						Info
					</Link>
				</li>
			</ul>

			<ul className="secondary-nav">
				{showFilter && (
					<li className="filter text-right ml-2">
						<button onClick={() => setFilterState(!filterState)}>
							<span>Filter</span>
						</button>
						{filterState && (
							<ul className="filter">
								<li className="ml-2">
									<span>asd</span>
								</li>
								<li className="ml-2">
									<span>asdadas</span>
								</li>
							</ul>
						)}
					</li>
				)}

				{previous && (
					<li>
						<Link to={previous.fields.slug}>Prev</Link>
					</li>
				)}

				{next && (
					<li>
						<Link to={next.fields.slug}>Next</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
