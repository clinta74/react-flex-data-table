import React from 'react';
import classNames from 'classnames';


const TableRow = ({ children, className, ...attrs }: DT.Element) => {
    const rowClassName = classNames(className, 'tr', {'dt-action-item': typeof(attrs.onClick) === 'function'});
    return (
        <div className={rowClassName} onClick={attrs.onClick} {...attrs}>
            {children}
        </div>
    );
}

export default TableRow;
