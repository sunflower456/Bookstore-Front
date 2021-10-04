import { styled } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Typography, Card } from "@material-ui/core";
import Page from "../components/Page";
import "./ImagesSlide.scss";
import DetailTable from "../components/detail/DetailTable";
import DetailTableEdit from "../components/detail/DetailTableEdit";
import DetailTableEmpty from "../components/detail/DetailTableEmpty";

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
    const [detail, setDetail] = useState(<DetailTableEmpty />);
    const [detailFlag, setDetailFlag] = useState("read");
    const [btnLabel, setBtnLabel] = useState("수정하기");
    const [product, setProduct] = useState();
    const { id } = useParams();

    const onEditClick = () => {
        if (detailFlag === "read") {
            setDetailFlag("edit");
            setDetail(<DetailTableEdit product={product} />);
            setBtnLabel("저장하기");
        } else {
            setDetailFlag("read");
            setDetail(<DetailTable product={product} />);
            setBtnLabel("수정하기");
            alert("수정 완료!");
        }
    };

    // store 상태 조회
    const { accessToken, myInfo } = useSelector(({ auth }) => ({
        accessToken: auth.accessToken,
        myInfo: auth.myInfo
    }));

    const updateState = (payload) => {
        return new Promise((resolve) => {
            setProduct({
                product: payload
            });
        });
    };

    const myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const fetchDetailData = async () => {
        const data = await fetch(`http://localhost:8080/api/post/${id}`, {
            method: "GET",
            headers: myHeaders
        }).then((response) => response.json());

        if (data) {
            await updateState(data);
            return data;
        }

        return product;
    };

    useEffect(() => {
        if (product === null || product === undefined) {
            fetchDetailData();
        }

        if (product) {
            setDetail(<DetailTable product={product} />);
        }
    }, [product]);

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
