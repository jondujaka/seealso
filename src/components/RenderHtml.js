import React from "react";
import hastToHyperscript from "hast-to-hyperscript";

export const RenderHtmlNode = node => {
	console.log(node);
  return hastToHyperscript(React.createElement, node);
};

const RenderHtml = ({content}) => {
	return <p dangerouslySetInnerHTML={{__html: content}} />
}

export default RenderHtml;
