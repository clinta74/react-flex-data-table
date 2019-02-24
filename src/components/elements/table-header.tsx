import React from 'react';
import classNames from 'classnames';


export const TableHeader = ({ children, className, ...attrs }: FlexTable.Element) => (
    <div className={classNames(className, 'thead')} { ...attrs }>
        {children}
    </div>
);
