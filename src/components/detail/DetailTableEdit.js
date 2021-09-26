import { useParams } from "react-router";
import { useState } from "react";
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
    Input,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from "@material-ui/core";
import clsx from "clsx";
import Check from "@material-ui/icons/Check";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import PRODUCTS from "../../_mocks_/products";

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

    // cover 수정하기
    const productImages = [
        product.cover,
        product.cover,
        product.cover,
        product.cover,
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
                                                {product.status ? (
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
                                    <b>sunflower45</b>
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
                                            value={product.name}
                                            style={{
                                                width: "100%",
                                                fontSize: "0.875rem"
                                            }}
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
                                        <Input
                                            name="bookTitle"
                                            value={product.name}
                                            style={{
                                                width: "100%",
                                                fontSize: "0.875rem"
                                            }}
                                        ></Input>
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
                                        <Input
                                            name="bookAuther"
                                            value="박준"
                                            style={{
                                                width: "100%",
                                                fontSize: "0.875rem"
                                            }}
                                        ></Input>
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
                                        <Input
                                            name="bookIsbn"
                                            value="1293847192438719384"
                                            style={{
                                                width: "100%",
                                                fontSize: "0.875rem"
                                            }}
                                        ></Input>
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
                                        <Input
                                            name="bookPublisher"
                                            value="문학동네"
                                            style={{
                                                width: "100%",
                                                fontSize: "0.875rem"
                                            }}
                                        ></Input>
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
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        <Input
                                            name="description"
                                            value="요약정보"
                                            style={{
                                                width: "100%",
                                                fontSize: "0.875rem"
                                            }}
                                        ></Input>
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
                                        <Input
                                            name="price"
                                            value={product.price}
                                            style={{
                                                width: "100%",
                                                fontSize: "0.875rem"
                                            }}
                                        ></Input>
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
                                            value={product.priceSale}
                                            style={{
                                                width: "100%",
                                                fontSize: "0.875rem"
                                            }}
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
                                                defaultValue="2"
                                                name="bookStatus"
                                            >
                                                <FormControlLabel
                                                    value="1"
                                                    control={<Radio />}
                                                    label="특상"
                                                />
                                                <FormControlLabel
                                                    value="2"
                                                    control={<Radio />}
                                                    label="상"
                                                />
                                                <FormControlLabel
                                                    value="3"
                                                    control={<Radio />}
                                                    label="중"
                                                />
                                                <FormControlLabel
                                                    value="4"
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
                                            name="bookSummary"
                                            value="부가 설명"
                                            style={{
                                                width: "100%",
                                                fontSize: "0.875rem"
                                            }}
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
                                                defaultValue="3"
                                                name="postStatus"
                                            >
                                                <FormControlLabel
                                                    value="1"
                                                    control={<Radio />}
                                                    label="판매중"
                                                />
                                                <FormControlLabel
                                                    value="2"
                                                    control={<Radio />}
                                                    label="거래중"
                                                />
                                                <FormControlLabel
                                                    value="3"
                                                    control={<Radio />}
                                                    label="거래완료"
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