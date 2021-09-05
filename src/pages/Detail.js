import { useParams } from "react-router";
import { useState } from "react";
import { styled } from "@material-ui/core/styles";
import {
    Button,
    ButtonGroup,
    Paper,
    Typography,
    Avatar
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Page from "../components/Page";
import PRODUCTS from "../_mocks_/products";
import "./ImagesSlide.scss";

// ----------------------------------------------------------------------

export default function ProductDetail() {
    const { id } = useParams();

    const [imageCurrentNo, setImageCurrentNo] = useState(0);

    const product = PRODUCTS[id];
    const product2 = PRODUCTS[id + 1];

    const productImages = [
        product.cover,
        product2.cover,
        product.cover,
        product2.cover,
        product.cover
    ];

    const onChangeImage = (index) => {
        let currIndex = index;

        if (productImages.length <= currIndex) {
            currIndex = 0;
        }
        if (index < 0) {
            currIndex = productImages.length - 1;
        }
        setImageCurrentNo(currIndex);
    };

    return (
        <Page title="허브중고서점">
            <Typography variant="h2" sx={{ mb: 15 }}>
                중고책 상세 보기
            </Typography>
            <Paper elevation={3} style={{ padding: "20px" }}>
                <Grid container>
                    <Grid item xs={4}>
                        <Paper>
                            <div className="imageSlide">
                                <div className="navBox">
                                    <span>{imageCurrentNo + 1}</span>
                                    <span>/</span>
                                    <span>
                                        {productImages && productImages.length}
                                    </span>
                                </div>
                                <div className="slideBox">
                                    <div
                                        className="slideList"
                                        style={{
                                            transform: `translate3d(${
                                                imageCurrentNo * -500
                                            }px, 0px, 0px)`
                                        }}
                                    >
                                        {productImages?.map((image, no) => (
                                            <div
                                                className="slideContent"
                                                key={no}
                                            >
                                                <picture>
                                                    <img
                                                        src={image}
                                                        style={{
                                                            width: "50%"
                                                        }}
                                                    />
                                                </picture>
                                            </div>
                                        ))}
                                    </div>

                                    <div
                                        className="buttonPrev"
                                        onClick={() =>
                                            onChangeImage(imageCurrentNo - 1)
                                        }
                                    >
                                        <i className="fas fa-chevron-left"></i>
                                    </div>
                                    <div
                                        className="buttonNext"
                                        onClick={() =>
                                            onChangeImage(imageCurrentNo + 1)
                                        }
                                    >
                                        <i className="fas fa-chevron-right"></i>
                                    </div>
                                </div>
                                <div
                                    className="paginationBox"
                                    style={{ width: "50%" }}
                                >
                                    {productImages.map((image, no) => (
                                        <div
                                            key={no}
                                            onClick={() => {
                                                onChangeImage(no);
                                            }}
                                        >
                                            <picture>
                                                <img src={image} />
                                            </picture>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <TableContainer component={Paper}>
                            <Table aria-label="custom pagination table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            제목
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            {product.name}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            저자
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            박 준
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            ISBN
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            1293847192438719384
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            출판사
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            문학동네
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            요약 정보
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            요약정보
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            정가
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            {product.price}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            판매가
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            {product.priceSale}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            상태
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            특상
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            부가 설명
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            부가 설명
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Paper>
            <br />
            <br />
            <ButtonGroup variant="contained" color="primary">
                <Button size="large">장바구니</Button>
                <Button size="large">구매하기</Button>
            </ButtonGroup>
        </Page>
    );
}
