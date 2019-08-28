import React from 'react';

const projectsList = ({ items }) => {

	return (
		<div>
			<span>ProjectsList</span>
			{items &&
				items.map((item, index) => {
					return (
						<a href={item.node.fields.slug} key={index}>
							{item.node.frontmatter.title}
						</a>
					);
				})}
		</div>
	);
};

export default projectsList;
