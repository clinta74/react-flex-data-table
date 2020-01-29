import React from 'react';

import FlexTable from 'react-flexbox-table';
import { MyData } from './app';


type ExampleEditFormProps = FlexTable.IForm<MyData>;

export class ExampleEditForm extends React.PureComponent<ExampleEditFormProps, MyData> {
    constructor(props: ExampleEditFormProps) {
        super(props);
        this.state = props.item || {
            id: 0,
            firstName: '',
            lastName: '',
            comment: '',
            amount: 0,
            birthday: '',
            colors: '',
        }
    }

    onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.currentTarget.name as keyof MyData;
        const data = {
            ...this.state,
            [key]: event.currentTarget.value
        }
        this.setState(data);
    }

    render() {
        const { items, onSave, onCancel } = this.props;
        const { firstName, lastName, comment } = this.state;
        return (
            <FlexTable.EditableForm 
                onSave={onSave} 
                onCancel={onCancel} 
                getState={() => this.state}
                items={items}
                >
                    
                <FlexTable.TableCell className="col-3">
                    <input type="text" className="form-control" value={firstName} name="firstName" onChange={this.onChangeInput} />
                </FlexTable.TableCell>

                <FlexTable.TableCell className="col-3">
                    <input type="text" className="form-control" value={lastName} name="lastName" onChange={this.onChangeInput} />
                </FlexTable.TableCell>

                <FlexTable.TableCell className="col">
                <input type="text" className="form-control" value={comment} name="comment" onChange={this.onChangeInput} />
                </FlexTable.TableCell>
            </FlexTable.EditableForm>
        );
    }
}