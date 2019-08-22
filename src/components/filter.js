import React from 'react';
import { Link } from 'gatsby';

import styled from 'styled-components';

export default props => {
    const items = props.items;

    console.log(items);

    const itemsList = items.map((item, index) => {
        return (
            <li key={index}>
                <a href={item.slug}>{item.fullName}</a>
            </li>
        );
    });

    return <ul>{itemsList}</ul>;
};
