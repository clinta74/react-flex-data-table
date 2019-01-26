import React from 'react';
import classNames from 'classnames';


const TableFooter = ({ children, className, ...attrs }: DT.Element) => (
    <div className={ classNames(className, 'tfoot') } { ...attrs }>
        { children }
    </div>
);

export default TableFooter;