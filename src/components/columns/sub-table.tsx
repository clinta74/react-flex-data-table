import React from 'react';
import { TableCell } from '../elements';
import classNames from 'classnames';

const SubTable = <T extends {}>(props: FlexTable.SubTableProps<T>, { ...attrs })=> {
    const { cellClassName, isVisible, onSubTableRender} = props;
    const { item, className } = attrs;
    const newCellClassName = (cellClassName && typeof cellClassName === 'function') ? cellClassName(item) : cellClassName;

    if (isVisible(item)) {
        return (
            <TableCell cellClassName={newCellClassName} className={classNames(className, 'dt-sub-table p-2')}>
                {onSubTableRender(item)}
            </TableCell>
        );
    } else {
        return null;
    }
};

export default SubTable;