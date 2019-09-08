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

					return list ? (
						<Link
							to={item.node.fields.slug}
							key={`archive-${index}`}
							className="list-link"
						>
							•{item.node.frontmatter.title}

							<div className="project-thumbnail">
								project thumbnail
							</div>
						</Link>
					) : (
						<div className="link-wrapper" key={`archive-${index}`}>
							<Link to={item.node.fields.slug}>
								•
								{title}
								<div className="project-thumbnail">
									project thumbnail
								</div>
							</Link>
						</div>
					);
				})}
		</div>
	);
};

export default ProjectsList;
