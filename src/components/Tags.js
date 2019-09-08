import React from 'react';

const Tags = ({tags}) => {
	return(
		<div>
			{
				tags && tags.map((tag, i) => (
					<span key={`tag-${i}`}>
						{i!==0 && ', '}
						{tag}
					</span>
				))
			}
		</div>
	)
}

export default Tags;
