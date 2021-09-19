import { Button, Container, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import useStyles from "../styles";

export default function Welcome() {
    const classes = useStyles();

    return (
        <Container>
            <Typography variant="h5" gutterBottom textAlign={"center"}>
                회원이 되신 것을 환영합니다!
            </Typography>
            <div align={"center"}>
                <Button
                    component={RouterLink}
                    to="/"
                    size="large"
                    variant={"contained"}
                    color={"success"}
                >
                    메인으로
                </Button>
            </div>
        </Container>
    );
}
