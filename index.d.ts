declare namespace FlexTable {
    //
    // Props / State
    // ----------------------------------------------------------------------

    type Element = React.HTMLAttributes<HTMLDivElement> & {
        cellClassName?: (ClassNameHandler | string)
    };

    interface Editable<ID> {
        isEditing: boolean;
        editID: ID | null;
    }

    interface Insertable {
        disableInsert?: boolean;
    }

    interface Savable<T> {
        onSave: SaveHandler<T>;
        onCancel: CancelHandler;
    }

    interface Updatable<ID> {
        onEdit: EditHandler<ID>;
        onDelete?: DeleteHandler<ID>;
    }

    interface Header {
        headerText?: JSX.Element | string;
        headerClass?: (() => string) | string;
        binding?: any;
        getLink?: any;
        onRender?: any;
        formatter?: any;
        onAction?: any;
        hideHeader?: boolean;
    }

    interface Item<T> {
        item?: T;
    }

    interface Table<T> {
        items?: T[];
    }

    interface Groupable<T, ID> {
        groupOn?: (item: T) => ID;
        groupHeader?: (items: T[]) => JSX.Element;
    }

    type ValidationTest<M, P> = { passCondition: (params: P) => boolean, result: M };
    type FormChildNodes = ElementType | ElementType[];
    type TableChildNodes<T> = null | ColumnType<T> | ColumnType<T>[]

    type ValidationResult<M = any> = {
        success: boolean,
        results: M[] | [],
    };

    type RowProps = { 
        className?: ClassNameHandler;
        onClick?: RowOnClickHandler;
    }

    type DataTableProps<T, ID> = TableElement<T, ID> & {
        readonly header?: TableRenderer<T>;
        readonly footer?: TableRenderer<T>;
        readonly itemRenderer?: RowRenderer<T>;
        readonly row?: RowProps;
        readonly footerClassName?: string;
        children: TableChildNodes<T>;
    }

    type FormProps<T, P = {}, M = {}> = Form<T> & {
        getState: () => any;
        children?: FormChildNodes;
        validationTests?: ValidationTest<M, P>[];
        onValidation?: (messages: M[]) => void;
    }

    type FormRenderHandler<T> = (props: Item<T>) => JSX.Element;

    type EditableTableProps<ID, T> = EditableTable<ID, T> & 
        DataTableProps<T, ID> & {
        form: FormRenderHandler<T>;
        getId: (item: T) => ID;
        nonEditableRow?: NonEditableRowHandler;
        insertItem?: any;
    }

    type ClassNameHandler = ((item: any) => string) | undefined;
    type RowOnClickHandler = ((item: any) => void) | undefined;
    type NonEditableRowHandler = ((item: any) => boolean) | undefined;

    type Form<T> = Savable<T> & Item<T> & Table<T>;
    type EditableTable<ID, T> = Editable<ID> & Insertable & Updatable<ID> & Table<T> & Groupable<T, ID>;
    type EditableList<ID, T> = Editable<ID> & Table<T>;

    type HeaderElement<T> = Header & Element & Item<T>;
    type ItemElement<T> = Item<T> & Element;
    type TableElement<T, ID> = Table<T> & Groupable<T, ID> & React.HTMLAttributes<HTMLDivElement>;


    //
    // Elements / Components
    // ----------------------------------------------------------------------

    type ElementType = React.ReactElement<Element>;
    type ColumnType<T> = React.ReactElement<HeaderElement<T>>;


    //
    // Handlers
    // ----------------------------------------------------------------------

    type Handler<TEvent> = (item: any, e: TEvent) => void;
    type SaveHandler<T> = (item: T) => void;
    type CancelHandler = () => void;
    type EditHandler<ID> = (id: ID | null) => void;
    type DeleteHandler<ID> = (id: ID) => void;
    
    //
    // Rendering
    // ----------------------------------------------------------------------

    type Renderer = () => React.ReactElement<any>;
    type ColumnRenderer<T> = <R extends ItemElement<T>>(item: T) => React.ReactElement<R> | string;
    type RowRenderer<T> = <R extends ItemElement<T>>(item: T, 
        columns: React.ReactElement<R>[], 
        row: RowProps, 
        defaultRenderer?: () => React.ReactElement<T>) => React.ReactElement<T>;
    type TableRenderer<T> = (<T>(items: T[]) => React.ReactElement<T> | null) | false;

    //
    // Column props
    // -----------------------------------------------------------------------

    type ColumnProps<T> = ItemElement<T> & HeaderElement<T>;

    type ActionHandler = Handler<React.MouseEvent<HTMLElement>>;

    interface ActionColumnProps<T> extends ColumnProps<T> {
        onAction: ActionHandler;
    }

    interface BoundColumnProps<T> extends ColumnProps<T> {
        binding: ((item: T) => string) | string;
        formatter?: (value: T) => string;
        children?: never;
    }

    interface CustomColumnProps<T> extends ColumnProps<T> {
        onRender: ColumnRenderer<T>;
        children?: never;
        onAction?: ActionHandler;
    }

    interface LinkColumnProps<T> extends ColumnProps<T> {
        getLink: (item: T) => string;
    }

    interface SubTableProps<T> extends ColumnProps<T> {
        isVisible: (item: T) => boolean;
        hideHeader: boolean | undefined;
        onSubTableRender: (item: any) => JSX.Element;
    }
}

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
}