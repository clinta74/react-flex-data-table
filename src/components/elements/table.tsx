import React from 'react';
import classNames from 'classnames';

const Table = ({ children, className, ...attrs }: FlexTable.Element) => (
    <div className={ classNames(className, 'flex-table') } { ...attrs }>
        { children }
    </div>
);

export default Table;
