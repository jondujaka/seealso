import React from 'react';

export default props => {
	const posts = props.posts;

	const list = posts.map((post, index) => {
		const title = post.node.frontmatter.title;
		const link = post.node.fields.slug;

		return (
			<li key={index}>
				<a href={link}> {title}</a>
			</li>
		);
	});

	return <ul>{list}</ul>;
};
