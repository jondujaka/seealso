import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import SeeAlso from '../components/SeeAlso';
import '../styles/index.scss';
import { withPrefix } from 'gatsby';

// TemplateWrapper.propTypes = {
// 	showNav: true,
// 	showFilter: false,
// 	title: 'See Also',
// 	description: 'See Also, an amazing studio'
// }
const TemplateWrapper = ({
	children,
	title,
	description,
	showFilter,
	pagination,
	showNav
}) => {
	return (
		<div>
			{showNav && (<Navbar showFilter={showFilter} pagination={pagination} />)}
			<div>{children}</div>
			<SeeAlso />
		</div>
	);
};

export default TemplateWrapper;
