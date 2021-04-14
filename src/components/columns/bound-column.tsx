import React from 'react';
import { getObjectByNamespace } from '../../util/'
import { CustomColumn } from './custom-column';
import { FlexTable } from '../..';

type Formatter<T> = ((value: T) => React.ReactNode) | undefined;

const getValue = <T extends unknown>(formatter: Formatter<T>, value: T) => formatter ? formatter(value) : value;

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

export const BoundColumn = <T extends {}>({ binding, formatter, ...attrs }: FlexTable.BoundColumnProps<T>) => {
    const render = (item: T) => {
        const value = typeof binding === 'string' ? getObjectByNamespace(binding, item) as string : binding(item);
        return (
        <>
            {getValue(formatter, value)}
        </>)
    }
    return (
        <CustomColumn {...attrs} onRender={render} />
    );
};
