import React from 'react';
import classNames from 'classnames';


const TableHeaderCell = ({ headerText = '\u00a0', headerClass, className, cellClassName, children, binding, getLink, onRender, formatter, onAction, ...attrs }: DT.HeaderElement<any>) => {
    const headerClassName: string | undefined = typeof headerClass === 'string' ?
        headerClass :
        headerClass && headerClass();

    return (
        <div className={classNames(className, headerClassName, 'th')} {...attrs}>
            {headerText}
        </div>
    );
}

export default TableHeaderCell;