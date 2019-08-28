import React, { useState } from 'react';
import { Link } from 'gatsby';

const Navbar = ({ showFilter, pagination }) => {
	const [filterState, setFilterState] = useState(false);
	const { next, previous } = pagination ? pagination : false;

	return (
		<nav className="navbar">
			<ul className="main-nav">
				<li>
					<Link to="/archive" activeClassName="active">
						Archive
					</Link>
				</li>
				<li>
					<Link to="/info" activeClassName="active">
						Info
					</Link>
				</li>
			</ul>

			<ul className="secondary-nav">
				{showFilter && (
					<li className="filter text-right">
						<button
							href="#"
							onClick={() => setFilterState(!filterState)}
						>
							<span>Filter</span>
						</button>
						{filterState && (
							<ul className="filter">
								<li>
									<span>asd</span>
								</li>
								<li>
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
