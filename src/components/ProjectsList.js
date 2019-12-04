import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import Tags from './Tags.js';

const ProjectsList = ({ items }) => {

	const showComma = index => {
		return index === 0 ? null : ',';
	};

	return (
		<div className="projects-list">
			{items &&
				items.map((item, index) => {
					const title = item.node.frontmatter.title;
					const tags = item.node.frontmatter.tags;
					let thumb = null;
					if(item.node.frontmatter.images){
						thumb = item.node.frontmatter.images[0].childImageSharp;
					}
					return (
						<div class="link-wrapper">
							<Link
								to={item.node.fields.slug}
								key={`archive-${index}`}
								className="list-link"
							>
								<div className="project-thumbnail">
									{thumb && <Img fixed={thumb.fixed} />}
								</div>

								{item.node.frontmatter.title}
							</Link>
							{tags && <Tags tags={tags} /> }
						</div>
					)
				})}
		</div>
	);
};

export default ProjectsList;
