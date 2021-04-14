import * as React from 'react';
import { FlexTable } from '../..';
import { CustomColumn } from './custom-column';


export const ActionColumn = <T extends unknown>({ item, onAction, children, ...attrs }: FlexTable.ActionColumnProps<T>) => {
    const onClick: React.MouseEventHandler<HTMLAnchorElement> = event => {
        event.preventDefault();
        onAction(item, event);
    }
    const render = () =>
        <a href='#' onClick={onClick}>
            {children}
        </a>

    return <CustomColumn {...attrs} item={item} onRender={render} />
};
