import React from 'react';
import classNames from 'classnames';


const TableHeader = ({ children, className, ...attrs }: DT.Element) => (
    <div className={classNames(className, 'thead')} { ...attrs }>
        {children}
    </div>
);

export default TableHeader;
