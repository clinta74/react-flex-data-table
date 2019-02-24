import React from 'react';
import classNames from 'classnames';

export const Table = ({ children, className, ...attrs }: FlexTable.Element) => (
    <div className={ classNames(className, 'flex-table') } { ...attrs }>
        { children }
    </div>
);
