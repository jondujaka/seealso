import React from 'react';
import { Link } from 'gatsby';


const ProjectsList = ({ items }) => {

	const showComma = index => {
		return index == 0 ? null : ',';
	}


	return (
		<div className="projects-list">
			{items &&
				items.map((item, index) => {
					const title = item.node.frontmatter.title.split(' ');
					return (
						<div className="link-wrapper">
							<Link to={item.node.fields.slug}  key={`archive-${index}`}>


								{title.map((phrase, index) => {
									return (
										<span key={`${phrase}-index`}>
											{ index == 0 && (<span>•</span>)}

											{phrase}
											
											{ index == title.length - 1 ? 
												(
													<div className="project-thumbnail">project thumbnail</div>
												) : ( 
													<span>&nbsp;</span>
												)
											}
										</span>
									)
								})}
							</Link>
						</div>
					);

				})}
		</div>
	);
};

export default ProjectsList;
