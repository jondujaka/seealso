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
					const title = item.node.frontmatter.title.split(' ');

					return list ? (
						<Link
							to={item.node.fields.slug}
							key={`archive-${index}`}
							className="list-link"
						>
							{item.node.frontmatter.title}

							<div class="project-thumbnail">
								project thumbnail
							</div>
						</Link>
					) : (
						<div className="link-wrapper" key={`archive-${index}`}>
							<Link to={item.node.fields.slug}>
								{title.map((phrase, index) => {
									return (
										<span key={`${phrase}-index`}>
											{index === 0 && <span>•</span>}

											{phrase}

											{index === title.length - 1 ? (
												<div className="project-thumbnail">
													project thumbnail
												</div>
											) : (
												<span>&nbsp;</span>
											)}
										</span>
									);
								})}
							</Link>
						</div>
					);
				})}
		</div>
	);
};

export default ProjectsList;
