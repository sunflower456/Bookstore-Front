import {
    Paper,
    Table,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Typography
} from "@material-ui/core";
import EnhancedTable from "../common/EnhancedTable";

export default function SalesAndPurchases() {
    return (
        <Paper>
            <Typography variant={"h3"}>판매 정보</Typography>
            <EnhancedTable />
        </Paper>
    );
}
