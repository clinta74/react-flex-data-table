import React from 'react';
import { DataTable, BoundColumn, EditableTable, SubTable } from '../../../../src/index';
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
                <h2>Flex Data Table Example</h2>
                <div>
                    <DataTable<MyData, number> items={items} >
                        <BoundColumn<MyData> binding="firstName" headerText="First Name" className="col-3" />
                        <BoundColumn<MyData> binding={item => item.lastName} headerText="Last Name" className="col-3" />
                        <BoundColumn<MyData> binding={item => item.comment} headerText="Comment" className="col-6" />
                        <SubTable<MyData> hideHeader cellClassName="col-12" isVisible={item => item && item.id === 2}
                            onSubTableRender={item => <ColorList color={item.colors} />} />
                    </DataTable>
                </div>
                <hr />
                <h2>Flex Edit Table Example</h2>
                <div>
                    <EditableTable
                        items={items}
                        isEditing={isEditing}
                        editID={editId}
                        getId={this.getId}
                        onEdit={this.onEdit}
                        form={this.renderForm}
                    >
                        <BoundColumn<MyData> binding={item => item.firstName} headerText="First Name" className="col-3" />
                        <BoundColumn<MyData> binding={item => item.lastName} headerText="Last Name" className="col-3" />
                        <BoundColumn<MyData> binding={item => item.comment} headerText="Comment" className="col" />
                    </EditableTable>
                </div>
            </section>
        );
    }
}

const ColorList: React.FunctionComponent<{ color: string }> = ({ color }) => {
    const colors = Array.from(color);
    return (
        <DataTable items={colors}>
            <BoundColumn binding={(item: string) => item} headerText="Color" className="col-12" />
        </DataTable>
    );
}