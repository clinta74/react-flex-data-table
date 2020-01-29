import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSave, faBan } from "@fortawesome/free-solid-svg-icons";
import { FlexTable } from "../..";
import { TableRow, TableCell } from "../elements";
import { combineChildren, getSaveHandler } from "./editing-functions";


export function EditableForm<T>(props: FlexTable.FormProps<T>) {
    const { children, onCancel } = props;

    return (
        <TableRow className='editing'>
            {
                combineChildren(children,
                    <TableCell className='ft-shrink-column'>
                        <div className='btn-group'>
                            <a className='btn btn-outline-secondary saveBtn' onClick={() => getSaveHandler(props)}>
                                <FontAwesomeIcon className="text-primary" icon={faSave} />
                            </a>
                            <a className='btn btn-outline-secondary cancelBtn' onClick={onCancel}>
                                <FontAwesomeIcon className="text-danger" icon={faBan} />
                            </a>
                        </div>
                    </TableCell>) as FlexTable.FormChildNodes
            }
        </TableRow>
    );
};