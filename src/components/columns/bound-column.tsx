import * as React from 'react';
import { withHeader } from './with-header';
import { TableCell } from '../elements';
import { getObjectByNamespace } from '../../util/'
import { CustomColumn } from './custom-column';
import { FlexTable } from '../..';

type Formatter = ((value: unknown) => React.ReactNode) | undefined;

const getValue = (formatter: Formatter, value: unknown) => formatter ? formatter(value) : value;

/**
 * A bound column represents a table column which can 'bind' to a property of the items
 * in its parent table. It will then populate its cells with the the data from that property
 * binding, and can also be given a header to match. 
 * 
 * You can specify the property to match on via a function (item => item.propertyToBind)
 * 
 * @param {any} { item, binding, formatter, children, cellClassName, hideHeader, ...attrs } 
 * @returns 
 */

export const BoundColumn = <T extends {}>({ item, binding, formatter, ...attrs }: FlexTable.BoundColumnProps<T>) => {
    const value = typeof binding === 'string' ? getObjectByNamespace(binding, item) as string : item && binding(item)
    return (
        <CustomColumn {...attrs} onRender={() => getValue(formatter, value)} />
    );
};
