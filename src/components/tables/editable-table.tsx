import React from 'react';
import classNames from 'classnames';

import { DataTable } from './data-table';
import { withHeader } from '../columns/with-header';
import { TableCell } from '../elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FlexTable } from '../..';
import { combineChildren, getItemRenderer, getFooter } from './editing-functions';

export function EditableTable<ID, T>(props: FlexTable.EditableTableProps<ID, T>) {
    const { children, getId, isEditing, onEdit, onDelete, disableInsert, editID, row, nonEditableRow, footerClassName, form, insertItem, ...attrs } = props;
    const attr = { getId, isEditing, onEdit, onDelete, editID, nonEditableRow };
    const renderer = getItemRenderer(props);
    return (
        <DataTable
            itemRenderer={renderer}
            footer={() => getFooter(props)}
            footerClassName={classNames({ 'editing': isEditing && editID === null }, footerClassName)}
            row={row}
            {...attrs}>

            {combineChildren(children,
                <ActionColumn hideHeader {...attr} />
            ) as FlexTable.TableChildNodes<T>}
        </DataTable>
    );
};

interface ActionColumn<ID, T> extends FlexTable.ColumnProps<T> {
    nonEditableRow?: FlexTable.NonEditableRowHandler,
    itemId: ID,
    children?: never;
}

type ActionColumnProps<T, ID> =
    FlexTable.ColumnProps<T> &
    ActionColumn<T, ID> &
    FlexTable.Editable<T> &
    FlexTable.Updatable<T> & {
        nonEditableRow?: FlexTable.NonEditableRowHandler,
        getId: (item: T) => ID,
        children?: never;
    };

const ActionColumn = withHeader<ActionColumnProps<unknown, {}>>(({ item, onRender, children, onAction, cellClassName, hideHeader, getId, ...attrs }) => {
    const className = (cellClassName && typeof cellClassName === 'function') ? cellClassName(item) : cellClassName;
    const { nonEditableRow, onDelete, isEditing, onEdit } = attrs;

    if (nonEditableRow && nonEditableRow(item)) {
        return null;
    }
    const itemId = getId(item);
    return (
        <TableCell className={classNames('ft-shrink-column', className)}>
            <div className="btn-group">
                <a className={classNames('btn btn-outline-secondary editBtn', { disabled: isEditing })} onClick={() => onEdit(itemId)}>
                    <FontAwesomeIcon className="text-primary" icon={faPencilAlt} />
                </a>
                {onDelete &&
                    <a className={classNames('btn btn-outline-secondary deleteBtn', { disabled: isEditing })} onClick={() => onDelete(itemId)}>
                        <FontAwesomeIcon className="text-danger" icon={faTrashAlt} />
                    </a>}
            </div>
        </TableCell>
    );
});