import React from 'react';
import classNames from 'classnames';


export const TableFooter = ({ children, className, ...attrs }: FlexTable.Element) => (
    <div className={ classNames(className, 'tfoot') } { ...attrs }>
        { children }
    </div>
);