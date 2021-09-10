import { useParams } from "react-router";
import { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
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

function getSteps() {
    return ["특상", "상", "중", "하"];
}

function getPostSteps() {
    return ["판매중", "거래중", "거래완료"];
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

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed, icon } = props;

    let _active = active;

    // 1: 특상 2: 상 3: 중 4: 하
    if (icon === 2) {
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

function QontoPostStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed, icon } = props;

    let _active = active;

    // 1: 판매중 2: 거래중 3:거래완료
    if (icon === 3) {
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
export default function ProductDetail() {
    const { id } = useParams();
    const steps = getSteps();
    const postSteps = getPostSteps();
    const [imageCurrentNo, setImageCurrentNo] = useState(0);

    const product = PRODUCTS[id];
    const product2 = PRODUCTS[id + 1];

    // cover 수정하기
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
                            <Card style={{ width: "80%" }}>
                                <CardContent>
                                    <Avatar
                                        src={product.cover}
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
                                        백선화 sunflower45
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
                                                            style={{
                                                                color: "#212B36",
                                                                fontWeight:
                                                                    "500"
                                                            }}
                                                        >
                                                            {label}
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
                                    <TableRow>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            판매 상태
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
                                                            {label}
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
            <br />
            <br />
            <ButtonGroup variant="contained" color="primary">
                <Button size="large">채팅하기</Button>
                <Button size="large">관심목록 추가</Button>
            </ButtonGroup>
        </Page>
    );
}
