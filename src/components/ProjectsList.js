import React, { useState } from 'react';
import { Link } from 'gatsby';

const ProjectsList = ({ items }) => {
	const [list, setList] = useState(false);

	const showComma = index => {
		return index === 0 ? null : ',';
	};

	return (
		<div className="projects-list">
			<button className="view-switcher" onClick={() => setList(!list)}>
				Switch View
			</button>
			{items &&
				items.map((item, index) => {
					const title = item.node.frontmatter.title;

					return (
						<Link
							to={item.node.fields.slug}
							key={`archive-${index}`}
							className="list-link"
						>
							<div className="project-thumbnail">
								project thumbnail
							</div>

							{item.node.frontmatter.title}

						</Link>
					)
				})}
		</div>
	);
};

export default ProjectsList;
