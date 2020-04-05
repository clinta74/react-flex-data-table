import React from 'react';
import classNames from 'classnames';
import { FlexTable } from '../..';


export const TableCell = <T extends {}>({ children, className, cellClassName, item, hideHeader, ...attrs }: FlexTable.Header & FlexTable.Element & Partial<FlexTable.Item<T>>) => {
    const _cellClassName = typeof cellClassName === 'function' ? cellClassName(item) : cellClassName as string;
    return (
        <div className={classNames(_cellClassName, className, 'td')} {...attrs}>
            {children}
        </div>
    );
}