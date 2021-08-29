import { useParams } from "react-router";
import { styled } from "@material-ui/core/styles";
import { Button, ButtonGroup, Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Page from "../components/Page";
import PRODUCTS from "../_mocks_/products";

// ----------------------------------------------------------------------

export default function ProductDetail() {
    const { id } = useParams();

    const product = PRODUCTS[id];

    const ProductImgStyle = styled("img")({
        top: 0,
        width: "300px",
        objectFit: "cover"
    });

    return (
        <Page title="허브중고서점">
            <Typography variant="h2" sx={{ mb: 15 }}>
                중고책 상세 보기
            </Typography>
            <Paper elevation={3} style={{ padding: "20px" }}>
                <Grid container>
                    <Grid item xs={4}>
                        <Paper>
                            <ProductImgStyle
                                alt={product.name}
                                src={product.cover}
                            />
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
