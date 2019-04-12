# react-flexbox-table
A React based table and inline row editable table using flexbox.  This table uses composed controls to define its columns and header.

## Usage

### Installation
```
npm i react-flexgrid-table
```
### Quick Start
There are to main components for rendering a table.  DataTable is the basic render a table component that produces rows of defined columns with optional headers.
### DataTable

```
import FlexTable from 'react-flexbox-table';

const data = [
    {
        name: 'John Smith',
        birthdate: '1/1/1990',
    }
]

const MyTable
    return (
        <FlexTable.DataTable items={data}>
        </FlexTable.DataTable>
    );
}
....

