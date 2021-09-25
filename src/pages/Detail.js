import { styled } from "@material-ui/styles";
import { useState } from "react";
import { Button, ButtonGroup, Typography, Card } from "@material-ui/core";
import Page from "../components/Page";
import "./ImagesSlide.scss";
import DetailTable from "../components/detail/DetailTable";
import DetailTableEdit from "../components/detail/DetailTableEdit";

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
    const [detail, setDetail] = useState(<DetailTable />);
    const [detailFlag, setDetailFlag] = useState("read");
    const [btnLabel, setBtnLabel] = useState("수정하기");

    const onEditClick = () => {
        if (detailFlag === "read") {
            setDetailFlag("edit");
            setDetail(<DetailTableEdit />);
            setBtnLabel("저장하기");
        } else {
            setDetailFlag("read");
            setDetail(<DetailTable />);
            setBtnLabel("수정하기");
            alert("수정 완료!");
        }
    };

    return (
        <Page title="허브중고서점">
            <Typography variant="h2" sx={{ mb: 15 }}>
                허브 중고 서점
            </Typography>
            <Button
                size="large"
                variant="contained"
                style={{ float: "right", marginRight: "120px" }}
                onClick={onEditClick}
            >
                {btnLabel}
            </Button>
            <br />
            <SectionStyle>{detail}</SectionStyle>
            <br />
            <br />
            <ButtonGroup variant="contained" color="primary">
                <Button size="large">채팅하기</Button>
                <Button size="large">관심목록 추가</Button>
            </ButtonGroup>
        </Page>
    );
}
