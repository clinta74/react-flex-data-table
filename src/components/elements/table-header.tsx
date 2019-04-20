import React from 'react';
import classNames from 'classnames';
import { FlexTable } from '../..';


export const TableHeader = ({ children, className, ...attrs }: FlexTable.Element) => (
    <div className={classNames(className, 'thead')} { ...attrs }>
        {children}
    </div>
);
