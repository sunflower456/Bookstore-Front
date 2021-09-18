import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@material-ui/core/styles";
import { Button, Container, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
// components
import Page from "../components/Page";
// images

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    display: "flex",
    minHeight: "100%",
    alignItems: "center",
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10)
}));

const pageStyle = makeStyles((theme) => ({
    errorPaper: {
        padding: theme.spacing(2)
    },
    backButton: {
        marginTop: theme.spacing(3)
    }
}));

// ----------------------------------------------------------------------

export default function Page404() {
    const classes = pageStyle();

    return (
        <RootStyle title="페이지를 찾을 수 없습니다. | 허브 중고 서점">
            <Container maxWidth="xs" fixed>
                <Paper className={classes.errorPaper} elevation={3}>
                    <Typography variant="h1" color="secondary">
                        404
                    </Typography>
                    <Typography variant="h5" color="primary">
                        요청한 페이지를 확인할 수 없습니다.
                    </Typography>
                    <Button
                        className={classes.backButton}
                        to="/"
                        size="large"
                        variant="contained"
                        component={RouterLink}
                    >
                        홈화면으로
                    </Button>
                </Paper>
            </Container>
        </RootStyle>
    );
}
