import { Grid, Paper, Typography } from "@material-ui/core";
import EnhancedTable from "./table/EnhancedTable";

export default function SalesAndPurchases() {
    return (
        <Grid direction={"column"}>
            <Grid item md={6} xl={12}>
                <Paper>
                    <Typography variant={"h3"}>
                        내 판매글 (판매글 목록)
                    </Typography>
                    <EnhancedTable />
                </Paper>
            </Grid>
            <Grid item md={6} xl={12}>
                <Paper>
                    <Typography variant={"h3"}>
                        내 관심 목록 (구 내찜)
                    </Typography>
                    <EnhancedTable />
                </Paper>
            </Grid>
        </Grid>
    );
}
