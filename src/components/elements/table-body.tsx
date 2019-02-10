import React from 'react';
import classNames from 'classnames';


const TableBody = ({ children, className, ...attrs }: FlexTable.Element) => (
    <div className={ classNames(className, 'tbody') } { ...attrs }>
        { children }
    </div>
);

export default TableBody;
