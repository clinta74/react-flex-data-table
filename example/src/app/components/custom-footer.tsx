import { MyData } from "./app";
import FlexTable from 'react-flexbox-table';


const CustomFooter: React.FunctionComponent<{ items: MyData[], moreData: {} }> = ({ items }) => {
    return (
        <FlexTable.TableRow>
            <FlexTable.TableCell>
                My Footer
            </FlexTable.TableCell>
        </FlexTable.TableRow>
    );
}