// const asEditableList = <P, S, T, ID extends {}>(control: FlexTable.EditableTable<ID, T>) => {
//     const getEditableState = (props: P & FlexTable.Table<T>, state: S) => {
//         return Object.assign({}, {
//             items: props.items || [],
//             isEditing: false,
//             editID: null,
//         }, state);
//     }

//     const clearEditing(control) {
//         this.setState({ isEditing: false, editID: null });
//     }

//     enableEditing(id: number | null = null) {
//         this.setState({ isEditing: true, editID: id });
//     }

//     onEdit = (id?: number) => {
//         this.enableEditing(id);
//     }

//     onCancel = () => {
//         this.clearEditing();
//     }
// }