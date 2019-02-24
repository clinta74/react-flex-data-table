import React from 'react';
import classNames from 'classnames';

export const TableBody = ({ children, className, ...attrs }: FlexTable.Element) => (
    <div className={ classNames(className, 'tbody') } { ...attrs }>
        { children }
    </div>
);