import React from 'react';
import { groupBy } from 'lodash';
import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHeaderCell, TableCell } from '../elements';


//
// Supporting functions
// ----------------------------------------------------------------------

// - Check headers

const columnHasHeader = (child: FlexTable.ColumnType<any>): boolean =>
    child.props.headerClass || child.props.headerText ? true : false;

const hasAnyColumnHeaders = (children: FlexTable.ColumnType<any>[]): boolean =>
    children && children.some((child: FlexTable.ColumnType<any>) => columnHasHeader(child));

// - Get headers

const getColumnHeader = (child: FlexTable.ColumnType<any>, index: number) => {
    const { hideHeader, ...props } = child.props;
    return !hideHeader && <TableHeaderCell key={index} {...props} />
};

const getColumnHeaders = (children: FlexTable.ColumnType<any>[]) => (
    <TableRow>
        {
            React.Children.map(children, (child, index: number) => {
                const element = child as FlexTable.ColumnType<any>;
                return getColumnHeader(element, index);
            })
        }
    </TableRow>
);

// var groupBy = function<T, ID>(xs: T[], key: (x: T) => ID) {
//     return xs.reduce(function (rv, x) {
//         let kv = key(x);
//         (rv[kv] = rv[kv] || []).push(x);
//         return rv;
//     }, {});
// };

// - Rendering

const renderBody = <T extends {}, ID = number>(items: T[],
    children: React.ReactElement<any>[],
    itemRenderer: FlexTable.RowRenderer<any> = renderRow,
    grouping: FlexTable.Groupable<T, ID>,
    row: FlexTable.RowProps,
) => {

    if (grouping.groupOn) {
        const groupedItems = groupBy(items, grouping.groupOn);
        return Object.keys(groupedItems).map((group) => {
            const dataRows = renderGroup(groupedItems[group], children, row, itemRenderer, "group_" + group + "_");
            const groupHeader = grouping.groupHeader ? grouping.groupHeader(groupedItems[group]) : group

            return [
                <TableRow className={"ft-group-row"} key={"grouprow_" + group}>
                    <TableCell>
                        {groupHeader}
                    </TableCell>
                </TableRow>,
                dataRows
            ];
        });
    } else {
        return renderGroup(items, children, row, itemRenderer, "");
    }
}

// Render rows that are grouped together.
const renderGroup = (items: object[], children: React.ReactElement<any>[], row: FlexTable.RowProps, itemRenderer: FlexTable.RowRenderer<any>, key: any) => {
    return items.map((item, index) =>
        React.cloneElement(itemRenderer(item, children, row, () => renderRow(item, children, row)), { key: key + index })
    );
}

/**
 * Default row render
 * @param item 
 * @param columns 
 * @param rowClassName 
 */
const renderRow = (item: object, columns: React.ReactElement<any>[], row: FlexTable.RowProps) => {
    const rowOnClick = row.onClick != undefined ? () => { row.onClick && row.onClick(item) } : undefined;
    return (
        <TableRow className={row.className && row.className(item)} onClick={rowOnClick}>
            {
                React.Children.map(columns, (child, index: number) => {
                    const column = child as React.ReactElement<any>;
                    return React.cloneElement(column, { key: index, item });
                })
            }
        </TableRow>);
}


type DataTableState = {}

//
// Components
// ----------------------------------------------------------------------

/**
 * DataTable component pass in a collection of data
 * via the items property, and then define columns
 * for that data using some of our other provided components
 * such as BoundColumn!
 * 
 * @param items any[] the tables data set.
 * @param header Feader render function.
 * @param footer Footer render function.
 */
export class DataTable<T> extends React.PureComponent<FlexTable.DataTableProps<T>, DataTableState> {
    constructor(props: FlexTable.DataTableProps<T>) {
        super(props);

        this.state = {
            currentPage: 0,
            itemsPerPage: props.itemsPerPage || 50,
            visiblePages: 6
        }
    }

    handlePageChanged = (newPage: number) => {
        this.setState({ currentPage: newPage });
    }

    render() {
        const { items, children, className, header, footer, footerClassName, itemRenderer, groupOn, groupHeader, row, itemsPerPage, ...attrs } = this.props;

        if (items) {
            const columns = Array.isArray(children) ? children as FlexTable.ColumnType<T>[] : [children] as FlexTable.ColumnType<T>[];
            const renderColumnHeaders = hasAnyColumnHeaders(columns);
            const renderHeader = header !== false && (header || renderColumnHeaders);
            const renderFooter = !!footer;
            const grouping = { groupOn, groupHeader };
            const rowProps = row || {};

            return (
                <>
                    <Table
                        className={className}
                        {...attrs}>
                        {renderHeader &&
                            <TableHeader>
                                {header && header(items)}
                                {renderColumnHeaders && getColumnHeaders(columns)}
                            </TableHeader>}

                        <TableBody>
                            {renderBody(items, columns, itemRenderer, grouping, rowProps)}
                        </TableBody>

                        {renderFooter &&
                            <TableFooter className={footerClassName}>
                                {footer && footer(items)}
                            </TableFooter>}
                    </Table>
                </>
            );
        } else {
            return null;
        }
    }
};
