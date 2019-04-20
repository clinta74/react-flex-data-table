import React from 'react';
import classNames from 'classnames';
import { FlexTable } from '../..';


export const TableHeaderCell = ({ headerText = '\u00a0', headerClass, className, cellClassName, children, binding, getLink, onRender, formatter, onAction, ...attrs }: FlexTable.HeaderElement<any>) => {
    const headerClassName: string | undefined = typeof headerClass === 'string' ?
        headerClass :
        headerClass && headerClass();

    return (
        <div className={classNames(className, headerClassName, 'th')} {...attrs}>
            {headerText}
        </div>
    );
}