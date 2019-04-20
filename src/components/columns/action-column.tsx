import * as React from 'react';
import { TableCell } from '../elements/';
import { withHeader } from './with-header';


export const ActionColumn = withHeader<FlexTable.ActionColumnProps<unknown>>(({ item, onAction, children, cellClassName, ...attrs }) => {
    const className = (cellClassName && typeof cellClassName === 'function') ? cellClassName(item) : cellClassName;
    
    return (
        <TableCell cellClassName={className} { ...attrs }>
            <a href='#' onClick={e => { e.preventDefault(); onAction(item, e); }}>
                {children}
            </a>
        </TableCell>
    )
});
