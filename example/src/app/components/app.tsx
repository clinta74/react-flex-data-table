import React from 'react';
import FlexTable from 'react-flexbox-table';

import { data } from './example-data';
import { ExampleEditForm } from './example-edit-form';


export type MyData = {
    id: number,
    firstName: string,
    lastName: string,
    comment: string,
    amount: number,
    birthday: string,
    colors: string,
}

type AppProps = {

};
type AppState = {
    isEditing: boolean,
    editId: number | null,
    items: MyData[],
};

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            isEditing: false,
            editId: null,
            items: data.slice(0, 10),
        }
    }

    onEdit = (editId: number | null) => {
        this.setState({
            isEditing: true,
            editId,
        })
    }

    getId = (item: MyData) => item.id;

    onCancel = () => {
        this.setState({
            isEditing: false,
            editId: null,
        })
    }

    onSave = (item: MyData) => {
        const index = this.state.items.findIndex(i => this.getId(i) === this.getId(item))
        const items = [ 
            ...this.state.items.slice(0, index),
            item,
            ...this.state.items.slice(index + 1)
        ];

        this.setState({
            items,
        }, this.onCancel)
    }

    renderForm = (props: any) => {
        return (
            <ExampleEditForm
                onCancel={this.onCancel}
                onSave={this.onSave}
                {...props}
            />
        );
    }

    render() {
        const { isEditing, editId, items } = this.state;

        return (
            <section className="container">
                <h2>Flex Table Example</h2>
                <div>
                    <FlexTable.DataTable items={items} >
                        <FlexTable.BoundColumn binding={(item: MyData) => item.firstName} headerText="First Name" className="col-3" />
                        <FlexTable.BoundColumn binding={(item: MyData) => item.lastName} headerText="Last Name" className="col-3" />
                        <FlexTable.BoundColumn binding={(item: MyData) => item.comment} headerText="Comment" className="col-6" />
                        <FlexTable.SubTable hideHeader cellClassName="col-12" isVisible={(item: MyData) => item && item.lastName === 'Andrews'}
                            onSubTableRender={(item: MyData) => <ColorList color={item.colors} />} />
                    </FlexTable.DataTable>
                </div>
                <hr />
                <h2>Flex Edit Table Example</h2>
                <div>
                    <FlexTable.EditableTable
                        items={items}
                        isEditing={isEditing}
                        editID={editId}
                        getId={this.getId}
                        onEdit={this.onEdit}
                        form={this.renderForm}
                    >
                        <FlexTable.BoundColumn binding={(item: MyData) => item.firstName} headerText="First Name" className="col-3" />
                        <FlexTable.BoundColumn binding={(item: MyData) => item.lastName} headerText="Last Name" className="col-3" />
                        <FlexTable.BoundColumn binding={(item: MyData) => item.comment} headerText="Comment" className="col" />
                    </FlexTable.EditableTable>
                </div>
            </section>
        );
    }
}

const ColorList: React.FunctionComponent<{ color: string }> = ({ color }) => {
    const colors = Array.from(color);
    return (
        <FlexTable.DataTable items={colors}>
            <FlexTable.BoundColumn binding={(item: string) => item} headerText="Color" className="col-12" />
        </FlexTable.DataTable>
    );
}