import * as React from 'react';
import { withHeader } from './with-header';
import { TableCell } from '../elements';
import { Link } from 'react-router-dom';
import { FlexTable } from '../..';
import { CustomColumn } from '.';



/**
 * A LinkColumn should be used to generate a link based on some property
 * in the items passed to its parent data table, such as an ID field.
 * 
 * Pass a function to getLink such as (item) => `/someroute/${item.ID}` to 
 * generate a link.
 * 
 * The link is powered internally by react-router
 * 
 * @param {any} { item, getLink, children, cellClassName, hideHeader, ...attrs } 
 * @returns 
 */
export const LinkColumn = <T extends {}>({ item, getLink, children, cellClassName, hideHeader, ...attrs }: FlexTable.LinkColumnProps<T>) => {
    const render = (item: T) => 
        <Link to={getLink(item)}>
            {children}
        </Link>

    return <CustomColumn {...attrs} onRender={render} />
};
