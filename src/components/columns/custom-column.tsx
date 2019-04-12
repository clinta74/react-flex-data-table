import * as React from 'react';
import { withHeader } from './with-header';
import { TableCell } from '../elements';
import { FlexTable } from '../..';


export const CustomColumn = withHeader<FlexTable.CustomColumnProps<unknown>>(({ item, onRender, children, onAction, cellClassName, hideHeader, ...attrs }) => {
    const className = (cellClassName && typeof cellClassName === 'function') ? cellClassName(item) : cellClassName;
    const onClickTableCell: React.MouseEventHandler<HTMLDivElement> = event => 
        (onAction && onAction(item, event));
    return (
        <TableCell onClick={onClickTableCell} cellClassName={className} { ...attrs }>
            {onRender(item)}
        </TableCell>
    )
});
