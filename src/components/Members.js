import React from 'react';
import {Link} from 'gatsby';

const Members = ({allMembers, activeMembers}) => {

	const filteredMembers = allMembers.filter(member => 
		activeMembers.includes(member.node.frontmatter.fullName)
	);
	const showAnd = activeMembers.length === 2;

	return (
		<>
			{filteredMembers.map((member, i) => {
				return (
					<span key={i}>
						{i !== 0 && showAnd && <span> and </span>}
						{i!== 0 && !showAnd && <span>, </span>}
						<Link to={`/archive/${member.node.fields.slug}`}>
							{member.node.frontmatter.fullName}
						</Link>
					</span>
				)
			})
			}
		</>
	)
}

export default Members;
