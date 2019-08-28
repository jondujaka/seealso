import React from 'react';

const projectsList = ({items}) => {
  items.map(item => console.log(item));
  return(
    <div>
      <span>ProjectsList</span>
      {items && items.map((item, index) =>{
          return (
            <span key={index}>{item.node.frontmatter.title}</span>
          )
        })
      }
    </div>
  );
}

export default projectsList;