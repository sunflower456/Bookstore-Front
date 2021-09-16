import { Grid, Paper, Typography } from "@material-ui/core";
import EnhancedTable from "./table/EnhancedTable";

export default function MyFavorites() {
    return (
        <Grid container direction={"column"}>
            <Grid item md={6} xl={12}>
                <Paper>
                    <Typography variant={"h3"}>내 관심목록</Typography>
                    <EnhancedTable />
                </Paper>
            </Grid>
        </Grid>
    );
}
