import { useParams } from "react-router";
import { useState } from "react";
import StarIcon from "@material-ui/icons/Star";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
    Paper,
    Typography,
    Avatar,
    Card,
    CardContent,
    StepConnector,
    Input,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Button
} from "@material-ui/core";
import clsx from "clsx";
import Check from "@material-ui/icons/Check";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

export default function ProductDetail(props) {
    const { id } = useParams();
    const [imageCurrentNo, setImageCurrentNo] = useState(0);
    // store 상태 조회
    const { accessToken, myInfo } = useSelector(({ auth }) => ({
        accessToken: auth.accessToken,
        myInfo: auth.myInfo
    }));

    const onChangeEdit = (e) => {
        props.onChangeEdit(e.target.name, e.target.value);
    };

    console.log("edit props : ", props);
    // cover 수정하기
    const productImages = props.product.product.images;

    const bookSummarySubstr =
        props.product.product.bookResponse.bookSummary.substring(0, 30);
    const bookSummary = props.product.product.bookResponse.bookSummary;
    const [showSummary, setShowSummary] = useState(bookSummarySubstr);
    const [isSummary, setIsSummary] = useState(true);
    const [moreButton, setMoreButton] = useState("더보기");

    const bookSummaryClick = () => {
        if (isSummary) {
            // 더보기 눌렀을 시에
            setIsSummary(false);
            setShowSummary(bookSummary);
            setMoreButton("접기");
        } else {
            // 더보기를 접을 때
            setIsSummary(true);
            setShowSummary(bookSummarySubstr);
            setMoreButton("더보기");
        }
    };

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
        <Paper>
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
                                        <div className="slideContent" key={no}>
                                            <picture>
                                                {props.product.product
                                                    .myInterest ? (
                                                        <StarIcon
                                                            style={{
                                                                color: "yellow",
                                                                position:
                                                                "absolute",
                                                                left: "1px"
                                                            }}
                                                        />
                                                    ) : (
                                                        <StarIcon
                                                            style={{
                                                                color: "blue",
                                                                visibility: "hidden"
                                                            }}
                                                        />
                                                    )}
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
                        <Card style={{ width: "80%" }}>
                            <CardContent>
                                <Avatar
                                    src={myInfo.profileImage}
                                    style={{
                                        float: "left",
                                        marginTop: "-5px",
                                        marginRight: "15px"
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    component="p"
                                    style={{ marginTop: "3px" }}
                                >
                                    <b>{myInfo.identity}</b>
                                </Typography>
                            </CardContent>
                        </Card>
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
                                        <b>제목</b>
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        <Input
                                            name="title"
                                            defaultValue={
                                                props.product.product.title
                                            }
                                            style={{
                                                width: "100%",
                                                fontSize: "0.875rem"
                                            }}
                                            onChange={onChangeEdit}
                                        ></Input>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        <b>책 이름</b>
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {
                                            props.product.product.bookResponse
                                                .bookTitle
                                        }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        <b>저자</b>
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {
                                            props.product.product.bookResponse
                                                .bookAuthor
                                        }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        <b>ISBN</b>
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {
                                            props.product.product.bookResponse
                                                .bookIsbn
                                        }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        <b>출판사</b>
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {
                                            props.product.product.bookResponse
                                                .bookPublisher
                                        }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        <b>요약 정보</b>
                                    </TableCell>
                                    <TableCell component="th" align="center">
                                        {showSummary}
                                        {bookSummary.length > 30 && (
                                            <span className="moreButtonWrap">
                                                {"···"}
                                                <Button
                                                    onClick={bookSummaryClick}
                                                >
                                                    {moreButton}
                                                </Button>
                                            </span>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        <b>정가</b>
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {
                                            props.product.product.bookResponse
                                                .bookListPrice
                                        }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        <b>판매가</b>
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        <Input
                                            name="bookListPrice"
                                            defaultValue={
                                                props.product.product.price
                                            }
                                            style={{
                                                width: "100%",
                                                fontSize: "0.875rem"
                                            }}
                                            onChange={onChangeEdit}
                                        ></Input>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        <b>상태</b>
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                row
                                                aria-label="bookStatus"
                                                defaultValue={
                                                    props.product.product
                                                        .bookStatus
                                                }
                                                name="bookStatus"
                                                onChange={onChangeEdit}
                                            >
                                                <FormControlLabel
                                                    value="최상"
                                                    control={<Radio />}
                                                    label="최상"
                                                />
                                                <FormControlLabel
                                                    value="상"
                                                    control={<Radio />}
                                                    label="상"
                                                />
                                                <FormControlLabel
                                                    value="중"
                                                    control={<Radio />}
                                                    label="중"
                                                />
                                                <FormControlLabel
                                                    value="하"
                                                    control={<Radio />}
                                                    label="하"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        <b>부가 설명</b>
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        <Input
                                            name="description"
                                            defaultValue={
                                                props.product.product
                                                    .description
                                            }
                                            style={{
                                                width: "100%",
                                                fontSize: "0.875rem"
                                            }}
                                            onChange={onChangeEdit}
                                        ></Input>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        <b>판매 상태</b>
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                row
                                                aria-label="postStatus"
                                                defaultValue={
                                                    props.product.product
                                                        .postStatus
                                                }
                                                name="postStatus"
                                                onChange={onChangeEdit}
                                            >
                                                <FormControlLabel
                                                    value="판매 중"
                                                    control={<Radio />}
                                                    label="판매 중"
                                                />
                                                <FormControlLabel
                                                    value="예약 중"
                                                    control={<Radio />}
                                                    label="예약 중"
                                                />
                                                <FormControlLabel
                                                    value="판매 완료"
                                                    control={<Radio />}
                                                    label="판매 완료"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}
