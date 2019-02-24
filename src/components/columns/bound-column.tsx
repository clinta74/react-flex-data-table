import * as React from 'react';
import { withHeader } from './with-header';
import { TableCell } from '../elements';
import { getObjectByNamespace } from '../../util/'
import { CustomColumn } from './custom-column';

type Formatter = ((value: any) => any) | undefined;

const getValue = (formatter: Formatter, value: any) => formatter ? formatter(value) : value;

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
// export const BoundColumn = withHeader<FlexTable.BoundColumnProps<any>>(({ item, binding, formatter, children, cellClassName, hideHeader, ...attrs }) => {
//     const className = (cellClassName && typeof cellClassName === 'function') ? cellClassName(item) : cellClassName;
//     const value = typeof binding === 'string' ? getObjectByNamespace(binding, item) : binding(item)
//     return (
//         <TableCell cellClassName={className} {...attrs}>
//             {getValue(formatter, value)}
//         </TableCell>
//     );
// });

type BoundColumnFunc = (params: FlexTable.BoundColumnProps<any>) => JSX.Element;


export const BoundColumn: BoundColumnFunc = ({ item, binding, formatter, ...attrs }) => {
    const value = typeof binding === 'string' ? getObjectByNamespace(binding, item) as string : binding(item)
    return (
        <CustomColumn {...attrs} onRender={() => getValue(formatter, value)} />
    );
};
