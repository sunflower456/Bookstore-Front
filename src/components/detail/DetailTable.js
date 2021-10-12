import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarIcon from "@material-ui/icons/Star";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
    Paper,
    Typography,
    Avatar,
    Card,
    CardContent,
    Step,
    Stepper,
    StepLabel,
    StepConnector,
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

// ----------------------------------------------------------------------

export default function ProductDetail(props) {
    const { id } = useParams();
    const steps = getSteps();
    const postSteps = getPostSteps();
    const [imageCurrentNo, setImageCurrentNo] = useState(0);
    const [product, setProduct] = useState();

    const { accessToken, myInfo } = useSelector(({ auth }) => ({
        accessToken: auth.accessToken,
        myInfo: auth.myInfo
    }));

    const { bookStatus, postStatus } = props.product.product;

    console.log("props : ", props.product.product);

    // cover 수정하기
    const productImages = props.product.product.images;

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

    function getSteps() {
        return ["최상", "상", "중", "하"];
    }

    function getPostSteps() {
        return ["판매 중", "예약 중", "거래 완료"];
    }
    const QontoConnector = withStyles({
        alternativeLabel: {
            top: 10,
            left: "calc(-50% + 16px)",
            right: "calc(50% + 16px)"
        },
        active: {
            "& $line": {
                borderColor: "#784af4"
            }
        },
        completed: {
            "& $line": {
                borderColor: "#784af4"
            }
        },
        line: {
            borderColor: "#eaeaf0",
            borderTopWidth: 3,
            borderRadius: 1
        }
    })(StepConnector);
    const useQontoStepIconStyles = makeStyles({
        root: {
            color: "#eaeaf0",
            display: "flex",
            height: 22,
            alignItems: "center"
        },
        active: {
            color: "#784af4"
        },
        circle: {
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "currentColor"
        },
        completed: {
            color: "#784af4",
            zIndex: 1,
            fontSize: 18
        }
    });

    // 책상태 가져오는 함수
    function getStatus(status) {
        if (status === "최상") {
            return 1;
        } else if (status === "상") {
            return 2;
        } else if (status === "중") {
            return 3;
        } else {
            return 4;
        }
    }

    // 책상태 가져오는 함수
    function getPostStatus(status) {
        if (status === "판매 중") {
            return 1;
        } else if (status === "예약 중") {
            return 2;
        } else {
            return 3;
        }
    }

    // 책상태 가져오는 함수
    function QontoStepIcon(post) {
        const classes = useQontoStepIconStyles();
        const { active, completed, icon } = post;

        const status = getStatus(bookStatus);

        let _active = active;

        // 1: 특상 2: 상 3: 중 4: 하
        if (icon === status) {
            _active = true;
        } else {
            _active = false;
        }
        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: _active
                })}
            >
                {completed ? (
                    <Check className={classes.completed} />
                ) : (
                    <div className={classes.circle} />
                )}
            </div>
        );
    }

    // 판매 상태 가져오는 함수
    function QontoPostStepIcon(post) {
        const classes = useQontoStepIconStyles();
        const { active, completed, icon } = post;

        const status = getPostStatus(postStatus);
        let _active = active;

        // 1: 판매중 2: 예약중 3:판매완료
        if (icon === status) {
            _active = true;
        } else {
            _active = false;
        }
        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: _active
                })}
            >
                {completed ? (
                    <Check className={classes.completed} />
                ) : (
                    <div className={classes.circle} />
                )}
            </div>
        );
    }
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
                                                                position:
                                                                "absolute",
                                                                top: "45px",
                                                                left: "10px",
                                                                color: "yellow"
                                                            }}
                                                        />
                                                    ) : (
                                                    <div></div>
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
                                        style={{ width: "100px" }}
                                    >
                                        <b>제목</b>
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {props.product.product.title}
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
                                        {props.product.product.price}
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
                                        <Stepper
                                            alternativeLabel
                                            connector={<QontoConnector />}
                                        >
                                            {steps.map((label) => (
                                                <Step key={label}>
                                                    <StepLabel
                                                        StepIconComponent={
                                                            QontoStepIcon
                                                        }
                                                    >
                                                        <div
                                                            style={{
                                                                color: "#637381",
                                                                fontWeight:
                                                                    "400"
                                                            }}
                                                        >
                                                            {label}
                                                        </div>
                                                    </StepLabel>
                                                </Step>
                                            ))}
                                        </Stepper>
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
                                        {props.product.product.description}
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
                                        <Stepper
                                            alternativeLabel
                                            connector={<QontoConnector />}
                                        >
                                            {postSteps.map((label) => (
                                                <Step key={label}>
                                                    <StepLabel
                                                        StepIconComponent={
                                                            QontoPostStepIcon
                                                        }
                                                    >
                                                        <div
                                                            style={{
                                                                color: "#637381",
                                                                fontWeight:
                                                                    "400"
                                                            }}
                                                        >
                                                            {label}
                                                        </div>
                                                    </StepLabel>
                                                </Step>
                                            ))}
                                        </Stepper>
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
