import React from 'react';
import { MyData } from "./app";
import { TableRow, TableCell } from '../../../../src/index';

const CustomFooter: React.FunctionComponent<{ items: MyData[], moreData: {} }> = ({ items }) => {
    return (
        <TableRow>
            <TableCell>
                My Footer
            </TableCell>
        </TableRow>
    );
}