import React from 'react';
import { TableCell } from '../elements';
import classNames from 'classnames';
import { FlexTable } from '../..';

export const SubTable = <T extends {}>(props: FlexTable.SubTableProps<T>, { ...attrs })=> {
    const { cellClassName, isVisible, onSubTableRender, item } = props;
    const { className } = attrs;
    const newCellClassName = (cellClassName && typeof cellClassName === 'function') ? cellClassName(item) : cellClassName;

    if (item && isVisible(item)) {
        return (
            <TableCell cellClassName={newCellClassName} item={item}  className={classNames(className, 'dt-sub-table p-2')}>
                {onSubTableRender(item)}
            </TableCell>
        );
    } else {
        return null;
    }
};
