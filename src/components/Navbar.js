import React, { useState } from 'react';
import { Link } from 'gatsby';

const Navbar = ({showFilter}) => {
	const [filterState, setFilterState] = useState(false); 

	return (
		<nav className='navbar'>
			<ul>
				<li><Link to="/archive" activeClassName="active">Archive</Link></li>
				<li><Link to="/info" activeClassName="active">Info</Link></li>
				{showFilter && (
					<li class="filter text-right">
						<a href="#" onClick={() => setFilterState(!filterState)} ><span>Filter</span></a>
						{filterState && (
							<ul class="filter">
								<li><span>asd</span></li>
								<li><span>asdadas</span></li>
							</ul>
						)}
					</li>
				)}
			</ul>
		</nav>
	)
}

export default Navbar;
