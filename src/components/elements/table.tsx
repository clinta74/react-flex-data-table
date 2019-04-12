import React from 'react';
import classNames from 'classnames';
import { FlexTable } from '../..';

export const Table = ({ children, className, ...attrs }: FlexTable.Element) => (
    <div className={ classNames(className, 'flex-table') } { ...attrs }>
        { children }
    </div>
);
