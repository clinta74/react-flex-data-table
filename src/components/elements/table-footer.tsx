import React from 'react';
import classNames from 'classnames';
import { FlexTable } from '../..';


export const TableFooter = ({ children, className, ...attrs }: FlexTable.Element) => (
    <div className={ classNames(className, 'tfoot') } { ...attrs }>
        { children }
    </div>
);