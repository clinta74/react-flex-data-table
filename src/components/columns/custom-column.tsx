import * as React from 'react';
import { withHeader } from './with-header';
import { TableCell } from '../elements';


const CustomColumn = withHeader<DT.CustomColumnProps<any>>(({ item, onRender, children, onAction, cellClassName, hideHeader, ...attrs }) => {
    const className = (cellClassName && typeof cellClassName === 'function') ? cellClassName(item) : cellClassName;

    return (
        <TableCell onClick={e => onAction && onAction(item, e)} cellClassName={className} { ...attrs }>
            {onRender(item)}
        </TableCell>
    )
});

export default CustomColumn;