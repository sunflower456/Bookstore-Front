import { useState } from "react";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import {
    Paper,
    Typography,
    Avatar,
    Card,
    CardContent,
    Input,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Button
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function ProductDetail(props) {
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
    const [productImages, setProductImages] = useState(
        props.product.product.images
    );

    const bookSummarySubstr =
        props.product.product.bookResponse.bookSummary.substring(0, 30);
    const bookSummary = props.product.product.bookResponse.bookSummary;
    const [showSummary, setShowSummary] = useState(bookSummarySubstr);
    const [isSummary, setIsSummary] = useState(true);
    const [moreButton, setMoreButton] = useState("더보기");
    const maxImageLength = 5; // 최대 이미지 갯수

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

    const [fileNames, setFileNames] = useState([]);
    const handleDrop = (acceptedFiles) => {
        if (
            acceptedFiles.length + props.product.product.images.length >
            maxImageLength
        ) {
            alert("최대 업로드 가능한 이미지 수는 5개 입니다.");
        } else {
            setFileNames(acceptedFiles.map((file) => file.name));
            props.onChangeImageFile(acceptedFiles);
        }
    };

    const deleteImages = (no) => {
        if (no === 0) {
            alert("첫번째 이미지는 삭제할 수 없습니다.");
        } else {
            setProductImages(
                productImages.filter((img, imgId) => imgId !== no)
            );
            props.deleteImages(no);
        }
    };

    return (
        <Paper>
            <Grid container>
                <Grid item xs={4}>
                    <Paper>
                        <div
                            className="changeImages"
                            style={{
                                textAlign: "center",
                                padding: "20px",
                                border: "3px dashed #eeeeee",
                                backgroundColor: "#fafafa",
                                color: "#bdbdbd",
                                marginBottom: "20px"
                            }}
                        >
                            <Dropzone onDrop={handleDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <div
                                        {...getRootProps({
                                            className: "dropzone"
                                        })}
                                    >
                                        <input {...getInputProps()} />
                                        <p>
                                            추가할 이미지를 drag and drop 하세요
                                        </p>
                                    </div>
                                )}
                            </Dropzone>
                            <div>
                                <strong>Files:</strong>
                                <ul>
                                    {fileNames.map((fileName) => (
                                        <li key={fileName}>{fileName}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="imageSlide">
                            <div
                                className="paginationBox"
                                style={{ width: "50%" }}
                            >
                                {productImages.map((image, no) => (
                                    <div key={no}>
                                        <div
                                            style={{
                                                top: "170px",
                                                left: "35px"
                                            }}
                                        >
                                            <DeleteForeverIcon
                                                onClick={() => {
                                                    deleteImages(no);
                                                }}
                                            />
                                        </div>
                                        <picture>
                                            <img
                                                src={image}
                                                style={{
                                                    position: "relative"
                                                }}
                                            />
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
                                            type="number"
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
