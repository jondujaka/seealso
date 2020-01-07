import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from "gatsby"

const SeeAlso = (props) => {

	const data = useStaticQuery(graphql`
		query HeaderQuery {
			allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "project"}}}) {
				edges {
					node {
						frontmatter {
							templateKey
							title
						}
						fields {
							slug
						}
					}
				}
			}
		}
	`);

	const allProjects = data.allMarkdownRemark.edges;
	const [random, setRandom] = useState({link: ''});

	const getRandom = () => {
		const random = allProjects[Math.floor(Math.random()* allProjects.length)];
		console.log(window.location.href)
		if(window.location.href.indexOf(random) !== -1) {
			getRandom();
		}
		return random;
	}

	useEffect(() => {
		const randomProject = getRandom();
		setRandom({link: randomProject.node.fields.slug});
	}, []);

	return (
		<div className="see-also nav-item reverse double">
			<Link to={random.link}>See Also</Link>
		</div>
	);
};

export default SeeAlso;
