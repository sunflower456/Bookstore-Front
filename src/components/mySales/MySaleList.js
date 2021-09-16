import { Grid, Paper, Typography } from "@material-ui/core";
import EnhancedTable from "./table/EnhancedTable";

export default function MySaleList() {
    return (
        <Grid container direction={"column"}>
            <Grid item md={6} xl={12}>
                <Paper>
                    <Typography variant={"h3"}>내 판매글</Typography>
                    <EnhancedTable />
                </Paper>
            </Grid>
        </Grid>
    );
}
