import React from 'react';
import classNames from 'classnames';
import { FlexTable } from '../..';


export const TableRow = ({ children, className, ...attrs }: FlexTable.Element) => {
    const rowClassName = classNames(className, 'tr', {'ft-action-item': typeof(attrs.onClick) === 'function'});
    return (
        <div className={rowClassName} onClick={attrs.onClick} {...attrs}>
            {children}
        </div>
    );
}
