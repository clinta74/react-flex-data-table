import React from 'react';
import classNames from 'classnames';

const Table = ({ children, className, ...attrs }: FlexTable.Element) => (
    <div className={ classNames(className, 'vf-data-table') } { ...attrs }>
        { children }
    </div>
);

export default Table;
