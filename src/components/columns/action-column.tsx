import * as React from 'react';
import { TableCell } from '../elements/';
import { withHeader } from './with-header';


const ActionColumn = withHeader<FlexTable.ActionColumnProps<any>>(({ item, onAction, children, cellClassName, ...attrs }) => {
    const className = (cellClassName && typeof cellClassName === 'function') ? cellClassName(item) : cellClassName;
    
    return (
        <TableCell cellClassName={className} { ...attrs }>
            <a href='#' onClick={e => { e.preventDefault(); onAction(item, e); }}>
                {children}
            </a>
        </TableCell>
    )
});

export default ActionColumn;
