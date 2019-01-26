import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

type SortableTableHeaderProps = {
    onClick: (columnName: string) => void,
    sort: SortDirection,
    name: string;
    title: string
}

export const enum SortDirection {
    'NONE',
    'ASC',
    'DESC',
}

const sortIconMap = {
    [SortDirection.ASC]: faSortUp,
    [SortDirection.DESC]: faSortDown,
    [SortDirection.NONE]: faSort,
}

export const SortableTableHeader = (props: SortableTableHeaderProps) =>
    <div onClick={() => props.onClick(props.name)} className="d-flex justify-content-between dt-sort-column">
        <div>{props.title}</div>
        <div>
            <FontAwesomeIcon icon={sortIconMap[props.sort]} />
        </div>
    </div>