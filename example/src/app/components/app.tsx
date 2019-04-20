import React from 'react';
import FlexTable from '../../../../src/index';
import { data } from './example-data';


export type MyData = {
    firstName: string,
    lastName: string,
    comment: string,
    amount: number,
    birthday: string,
    colors: string,
}

type AppProps = {};
type AppState = {
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            fql: undefined,
        }
    }


    render() {

        return (
            <section className="container">
                <h2>Filter Bar Example</h2>
                <div>
                    <FlexTable.DataTable items={data} >
                        <FlexTable.BoundColumn binding={(item: MyData) => item.firstName} headerText="First Name" className="col-3"/>
                        <FlexTable.BoundColumn binding={(item: MyData) => item.lastName} headerText="Last Name" className="col-3"/>
                        <FlexTable.BoundColumn binding={(item: MyData) => item.comment} headerText="Comment" className="col-6"/>
                        <FlexTable.SubTable hideHeader cellClassName="col-12" isVisible={(item: MyData) => item && item.lastName === 'Andrews'}
                                    onSubTableRender={(item: MyData) => <ColorList color={item.colors}/>} />
                    </FlexTable.DataTable>
                </div>
            </section>
        );
    }
}

const CustomFooter: React.FunctionComponent<{items: MyData[], moreData: {}}> = ({ items }) => {
    return (
        <FlexTable.TableRow>
            <FlexTable.TableCell>
                My Footer
            </FlexTable.TableCell>
        </FlexTable.TableRow>
    );
}

const ColorList: React.FunctionComponent<{color: string}> = ({color}) => {
    const colors = Array.from(color);
    return (
        <FlexTable.DataTable items={colors}>
            <FlexTable.BoundColumn binding={(item: string) => item} headerText="Color" className="col-12"/>
        </FlexTable.DataTable>
    );
}