import * as React from 'react';
import { withHeader } from './with-header';
import { TableCell } from '../elements';
import { Link } from 'react-router-dom';



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
export const LinkColumn = withHeader<FlexTable.LinkColumnProps<any>>(({ item, getLink, children, cellClassName, hideHeader, ...attrs }) => {
    const className = (cellClassName && typeof cellClassName === 'function') ? cellClassName(item) : cellClassName;

    return (
        <TableCell cellClassName={className} {...attrs}>
            <Link to={getLink(item)}>
                {children}
            </Link>
        </TableCell>
    )
});
