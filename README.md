# react-flexbox-table
A React based table and inline row editable table using flexbox.  This table uses declarative components to define 
its columns, rows, and header. Support for inline editing, insert, and deletion via defineable row edit feature.

## Usage

### Installation
```
npm i react-flexgrid-table
```
### Quick Start
There are to main components for rendering a table.  DataTable is the basic render a table component that produces rows of defined columns with optional headers.
### DataTable

``` javascript
import FlexTable from 'react-flexbox-table';

const data = [
    {
		"firstName": "Aretha",
		"lastName": "Larsen",
		"amount": 416,
		"birthday": "2019-02-22T03:00:27-08:00",
		"colors": "red",
		"comment": "semper rutrum. Fusce dolor quam, elementum"
	}
]

const MyTable
    return (
        <FlexTable.DataTable items={data} >
            <FlexTable.BoundColumn binding={(item: MyData) => item.firstName} headerText="First Name" className="col-3"/>
            <FlexTable.BoundColumn binding={(item: MyData) => item.lastName} headerText="Last Name" className="col-3"/>
            <FlexTable.BoundColumn binding={(item: MyData) => item.comment} headerText="Comment" className="col-6"/>
            <FlexTable.SubTable hideHeader cellClassName="col-12" isVisible={(item: MyData) => item && item.lastName === 'Andrews'}
                        onSubTableRender={(item: MyData) => <ColorList color={item.colors}/>} />
        </FlexTable.DataTable>
    );
}
....
