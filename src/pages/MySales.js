import { styled } from "@material-ui/core/styles";
import { Card, Grid } from "@material-ui/core";

import Page from "../components/Page";
import MySaleList from "../components/mySales/MySaleList";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    display: "flex",
    marginTop: theme.spacing(10)
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: "100%",
    maxWidth: 800,
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: theme.spacing(10, 0, 2, 2),
    padding: theme.spacing(4),
    boxShadow: 10
}));

// ----------------------------------------------------------------------

export default function MySales() {
    return (
        <RootStyle title="내 판매글 | Herb Book Store">
            <Grid container justifyContent={"center"}>
                <SectionStyle>
                    <MySaleList />
                </SectionStyle>
            </Grid>
        </RootStyle>
    );
}
