import React from 'react';
import { Link } from "gatsby";
const _ = require('lodash');

const Tags = ({tags}) => {
	return(
		<div className="tags">
			{
				tags && tags.map((tag, i) => (
					<Link to={`/archive/${_.kebabCase(tag)}`} key={i} >
						{i!==0 && ', '}
						{tag}
					</Link>
				))
			}
		</div>
	)
}

export default Tags;
