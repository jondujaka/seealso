import React from "react";
import hastToHyperscript from "hast-to-hyperscript";

const RenderHtml = node => {
  return hastToHyperscript(React.createElement, node);
};

export default RenderHtml;
