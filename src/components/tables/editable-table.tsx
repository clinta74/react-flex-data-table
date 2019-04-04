import React from 'react';
import classNames from 'classnames';

import { validateAll } from '../../validation';
import { DataTable } from './data-table';
import { withHeader } from '../columns/with-header';
import { TableRow, TableCell, AddButton } from '../elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faSave, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';




//
// Supporting functions
// ----------------------------------------------------------------------

// - Nodes
const combineChildren = (children: any, newNode: any) => React.Children.toArray([].concat(children, newNode));

// - Rendering
function getItemRenderer<ID, T>({ form, getId, isEditing, editID, row }: FlexTable.EditableTableProps<ID, T>) {
    const FormComponent = form;
    return (item: any, children: React.ReactElement<any>[], row: FlexTable.RowProps, defaultRenderer: any) => {
        return isEditing && getId(item) === editID ?
            <FormComponent item={item} /> :
            defaultRenderer();
    }
}

function getFooter<ID, T>(props: FlexTable.EditableTableProps<ID, T>) {
    const { form, isEditing, editID, disableInsert, onEdit, insertItem } = props;
    const FormComponent = form;
    if (isEditing && editID === null) {
        return (
            <FormComponent item={insertItem} />
        )
    } else if (disableInsert) {
        return null;
    } else {
        return (

            <TableRow>
                <TableCell className='col-sm-12'>
                    <AddButton className={isEditing ? 'disabled' : undefined} onClick={() => onEdit(null)} />
                </TableCell>
            </TableRow>
        );
    }
}

// - Saving items

function getSaveHandler<T>(props: FlexTable.FormProps<T>) {
    const { onSave, items, getState, onValidation, validationTests } = props;
    const item = JSON.parse(JSON.stringify(getState()));

    if (!!validationTests) {
        const validationResult = validateAll(validationTests, { item, items });

        if (validationResult.success) {
            onSave(item);
        } else {
            !!onValidation && onValidation(validationResult.results);
        }
    } else {
        onSave(item);
    }
};


//
// Components
// ----------------------------------------------------------------------

export function EditableForm<T>(props: FlexTable.FormProps<T>) {
    const { children, onCancel } = props;

    return (
        <TableRow className='editing'>
            {combineChildren(children,
                <TableCell className='ft-shrink-column'>
                    <div className='btn-group'>
                        <a className='btn btn-outline-secondary saveBtn' onClick={() => getSaveHandler(props)}>
                            <FontAwesomeIcon className="text-primary" icon={faSave} />
                        </a>
                        <a className='btn btn-outline-secondary cancelBtn' onClick={onCancel}>
                            <FontAwesomeIcon className="text-danger" icon={faBan} />
                        </a>
                    </div>
                </TableCell>) as FlexTable.FormChildNodes}
        </TableRow>
    );
};

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