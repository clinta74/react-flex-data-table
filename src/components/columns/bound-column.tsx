import * as React from 'react';
import { withHeader } from './with-header';
import { TableCell } from '../elements';
import { getObjectByNamespace } from '../../util/'



const getValue = (formatter, value) => formatter ? formatter(value) : value;

/**
 * A bound column represents a table column which can 'bind' to a property of the items
 * in its parent table. It will then populate its cells with the the data from that property
 * binding, and can also be given a header to match. 
 * 
 * You can specify the property to match on via a function (item => item.propertyToBind)
 * 
 * @param {any} { item, binding, formatter, children, cellClassName, hideHeader, ...attrs } 
 * @returns 
 */
const BoundColumn = withHeader<DT.BoundColumnProps<any>>(({ item, binding, formatter, children, cellClassName, hideHeader, ...attrs }) => {
    const className = (cellClassName && typeof cellClassName === 'function') ? cellClassName(item) : cellClassName;
    const value = typeof binding === 'string' ? getObjectByNamespace(binding, item) : binding(item)
    return (
        <TableCell cellClassName={className} {...attrs}>
            {getValue(formatter, value)}
        </TableCell>
    );
});

export default BoundColumn;