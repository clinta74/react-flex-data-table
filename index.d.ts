import { FlexTable } from './src/index';
declare module 'react-flexbox-table' {
    export function ActionColumn<T>(props: FlexTable.ActionColumnProps<T>): JSX.Element;

    export function BoundColumn<T>(props: FlexTable.BoundColumnProps<T>): JSX.Element;

    export function CustomColumn<T>(props: FlexTable.CustomColumnProps<T>): JSX.Element;

    export function DataTable<T, ID>(props: FlexTable.DataTableProps<T, ID>): JSX.Element;

    export function LinkColumn<T>(props: FlexTable.LinkColumnProps<T>): JSX.Element;

    export function SubTable<T>(props: FlexTable.SubTableProps<T>): JSX.Element;

    export function EditableForm<T>(props: FlexTable.FormProps<T>): JSX.Element;

    export function EditableTable<ID, T>(props: FlexTable.EditableTableProps<ID, T>): JSX.Element;

    export function TableCell(_a: any): any;

    export function TableFooter(_a: any): any;

    export function TableHeaderCell(_a: any): any;

    export function TableHeader(_a: any): any;

    export function TableRow(_a: any): any;

    export type IEditableTable<ID> = FlexTable.Editable<ID>;

    export type IForm<T> = FlexTable.Form<T>;

    export type IValidationTest<T, M> = FlexTable.ValidationTest<T, M>;

    export type SimpleValiadtionTest<M> = IValidationTest<string, {item: M, items: M[]}>

    export type TableRenderer<T> = FlexTable.TableRenderer<T>;

    export type FormRenderHandler<T> = FlexTable.FormRenderHandler<T>;
}