# react-flex-data-table
A React based table and inline row editable table using flexbox.  This table uses declarative components to define 
its columns, rows, and header. Support for inline editing, insert, and deletion via defineable row edit feature.

## Usage

### Installation
```
npm i react-flex-data-table
```
### Quick Start
There are two main components for rendering a table.  DataTable is the basic render a table component that produces rows of defined columns with optional headers.  EditTable extends DataTable to provide Create, Update, and Delete functionality.  The Editing is provided as an inline row.  It also provides a validation function to hook into the onSave call back.
### DataTable

``` javascript
import { DataTable, BoundColumn, SubTable} from 'react-flexbox-table';

interface MyData {
		"firstName": string,
		"lastName": string,
		"amount": number,
		"birthday": Date | string,
		"colors": string,
}

const data: MyData = [
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
        <DataTable items={data} >
            <BoundColumn<MyData> binding={item => item.firstName} headerText="First Name" className="col-3"/>
            <BoundColumn<MyData> binding={item => item.lastName} headerText="Last Name" className="col-3"/>
            <BoundColumn<MyData> binding={item => item.comment} headerText="Comment" className="col-6"/>
            <SubTable<MyData> hideHeader cellClassName="col-12" isVisible={item => item && item.lastName === 'Andrews'}
                        onSubTableRender={item => <ColorList color={item.colors}/>} />
        </DataTable>
    );
}
```
### Included Columns
- BoundColumn
- LinkColumn
- ActionColumn
- CustomColumn
- SubTable

### Custom columns
You can develope your own column types based by using the CustomColumn component using its onRender render property.
``` javascript
export const MyColumn = <T extends {}>({ item, children, cellClassName, hideHeader, ...attrs }: MyColumnProps<T>) => {
    const render = (item: T) => 
        <div>
            {item}
        </div>

    return <CustomColumn {...attrs} onRender={render} />
};
```
