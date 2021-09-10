import { makeStyles, withStyles, styled } from "@material-ui/styles";
import {
    Button,
    ButtonGroup,
    Paper,
    Typography,
    Avatar,
    Card,
    CardContent,
    Step,
    Stepper,
    StepLabel,
    StepConnector
} from "@material-ui/core";
import clsx from "clsx";
import Check from "@material-ui/icons/Check";
import Page from "../components/Page";
import "./ImagesSlide.scss";
import DetailTable from "../components/detail/DetailTable";

// ----------------------------------------------------------------------

const SectionStyle = styled(Card)(({ theme }) => ({
    width: "100%",
    maxWidth: 900,
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "1px solid black",
    margin: theme.spacing(10, 0, 2, 2),
    padding: theme.spacing(4)
}));

export default function ProductDetail() {
    return (
        <Page title="허브중고서점">
            <Typography variant="h2" sx={{ mb: 15 }}>
                중고책 상세 보기
            </Typography>
            <SectionStyle>
                <DetailTable />
            </SectionStyle>
            <br />
            <br />
            <ButtonGroup variant="contained" color="primary">
                <Button size="large">채팅하기</Button>
                <Button size="large">관심목록 추가</Button>
            </ButtonGroup>
        </Page>
    );
}
