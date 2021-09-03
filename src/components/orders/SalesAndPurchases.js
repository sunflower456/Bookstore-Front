import {
    Grid,
    Paper,
    Table,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Typography
} from "@material-ui/core";
import EnhancedTable from "./table/EnhancedTable";

export default function SalesAndPurchases() {
    return (
        <Grid direction={"column"}>
            <Grid item md={6} xl={12}>
                <Paper>
                    <Typography variant={"h3"}>판매 정보</Typography>
                    <EnhancedTable />
                </Paper>
            </Grid>
            <Grid item md={6} xl={12}>
                <Paper>
                    <Typography variant={"h3"}>구매 정보</Typography>
                    <EnhancedTable />
                </Paper>
            </Grid>
        </Grid>
    );
}
