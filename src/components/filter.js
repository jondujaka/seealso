import React from 'react';
import { Link } from 'gatsby';

import styled from "styled-components";

export default props => {
  const items = props.items;

  const itemsList = items.map((item, index) => {
    return (<li key={index}>{item}</li>);
  });
  
  return (
    <ul>{itemsList}</ul>
  )
}
