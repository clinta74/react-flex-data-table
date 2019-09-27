import React from "react";

import { FlexTable } from "../..";

import { TableRow, TableCell, AddButton } from "../elements";

import { validateAll } from "../../validation";

//
// Supporting functions
// ----------------------------------------------------------------------

// - Nodes
export const combineChildren = (children: any, newNode: any) => React.Children.toArray([].concat(children, newNode));

// - Rendering
export function getItemRenderer<ID, T>({ form, getId, isEditing, editID, row }: FlexTable.EditableTableProps<ID, T>) {
    const FormComponent = form;
    return (item: any, children: React.ReactElement<any>[], row: FlexTable.RowProps, defaultRenderer: any) => {
        return isEditing && getId(item) === editID ?
            <FormComponent item={item} /> :
            defaultRenderer();
    }
}

export function getFooter<ID, T>(props: FlexTable.EditableTableProps<ID, T>) {
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

export function getSaveHandler<T>(props: FlexTable.FormProps<T>) {
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