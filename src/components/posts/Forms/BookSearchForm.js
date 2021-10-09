import React, { useRef, useState } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import {
    Alert,
    Avatar,
    Box,
    Card,
    CardContent,
    CardMedia,
    Divider,
    FormHelperText,
    Grid,
    Input,
    InputAdornment,
    ListItem,
    ListItemButton,
    ListItemText,
    NativeSelect,
    Paper,
    Stack,
    TextField,
    Typography
} from "@material-ui/core";
import { MenuBookTwoTone, SearchOutlined } from "@material-ui/icons";
import { FixedSizeList } from "react-window";
import { useFormikContext } from "formik";
import { InputField } from "../../common/FormFields";
import useStyles from "../styles";
import { searchBookInfo } from "../../../lib/api";

const bookSearchTypes = [
    {
        value: "title",
        label: "제목"
    },
    {
        value: "isbn",
        label: "ISBN"
    },
    {
        value: "author",
        label: "저자"
    }
];

export default function BookSearchForm(props) {
    const { values, errors, touched } = useFormikContext();
    const [keyword, setKeyword] = useState("");
    const [searchType, setSearchType] = useState("title");
    const [bookInformation, setBookInformation] = useState([]);
    const [isInsertSuccess, setIsInsertSuccess] = useState(false);

    const itemCount = 50; // 책 정보 검색 시 표기할 데이터 수

    const classes = useStyles();
    const {
        formField: {
            title,
            bookIsbn,
            bookTitle,
            bookAuthor,
            bookPublisher,
            bookThumbnail,
            bookListPrice,
            bookPubDate,
            bookSummary,
            bookSearchType
        }
    } = props;

    const searchKeywordArea = useRef();

    function renderRow(rowProps) {
        const { index, style } = rowProps;
        let itemIsbn;
        let itemTitle;
        let itemAuthor;
        let itemPublisher;
        let itemThumbnail;
        let itemPrice;
        let itemPubDate;
        let itemSummary;

        // 데이터 로딩 확인
        const isEmptyItem = !isItemLoaded(index);

        if (isEmptyItem) {
            itemTitle = "";
            itemAuthor = "";
            itemPublisher = "";
            itemThumbnail = "";
            itemPrice = "";
            itemPubDate = "";
        } else {
            const domParser = new DOMParser();

            itemIsbn = bookInformation[index].bookIsbn;
            // .replace(/(<([^>]+)>)/ig,""); : 데이터 중 <b> 등의 element가 섞여있어 이를 제거하고자함
            // html 태그로 parsing 후 innerText를 가져오는 방식으로 "&nbsp, <b/>" 같은 불순물 제거...;
            itemTitle = domParser.parseFromString(
                bookInformation[index].bookTitle,
                "text/html"
            ).documentElement.innerText;
            itemAuthor = domParser.parseFromString(
                bookInformation[index].bookAuthor,
                "text/html"
            ).documentElement.innerText;
            itemPublisher = domParser.parseFromString(
                bookInformation[index].bookPublisher,
                "text/html"
            ).documentElement.innerText;
            itemThumbnail = bookInformation[index].bookThumbnail;
            itemPrice = bookInformation[index].bookListPrice;
            itemPubDate =
                bookInformation[index].bookPubDate == null
                    ? ""
                    : bookInformation[index].bookPubDate;
            itemSummary = domParser.parseFromString(
                bookInformation[index].bookSummary,
                "text/html"
            ).documentElement.innerText;
        }

        const displayItems = (
            <>
                <ListItem
                    style={style}
                    key={`book-${index}`}
                    component={"div"}
                    disablePadding
                    onClick={() =>
                        setBookInfoFromSearchResult({
                            itemIsbn,
                            itemTitle,
                            itemAuthor,
                            itemPublisher,
                            itemThumbnail,
                            itemPrice,
                            itemPubDate,
                            itemSummary
                        })
                    }
                >
                    <ListItemButton>
                        <ListItemText
                            sx={{
                                width: "100%",
                                minWidth: "610px",
                                maxWidth: "670px"
                            }}
                            primary={
                                <Card sx={{ display: "flex" }}>
                                    {itemThumbnail === "" ? (
                                        <Avatar
                                            className={
                                                classes.bookItemThumbnail
                                            }
                                            variant={"square"}
                                        >
                                            <MenuBookTwoTone />
                                        </Avatar>
                                    ) : (
                                        <CardMedia
                                            component="img"
                                            className={
                                                classes.bookItemThumbnail
                                            }
                                            image={itemThumbnail}
                                            alt="책 이미지"
                                        />
                                    )}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}
                                    >
                                        <CardContent
                                            sx={{
                                                flex: "1 0 auto"
                                            }}
                                        >
                                            <Typography
                                                variant={"button"}
                                                sx={{
                                                    display: "block",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis"
                                                }}
                                            >
                                                {itemTitle}
                                            </Typography>
                                            <Stack
                                                direction={"row"}
                                                divider={
                                                    <Divider
                                                        orientation={"vertical"}
                                                        flexItem
                                                    />
                                                }
                                                spacing={2}
                                                sx={{ alignItems: "center" }}
                                            >
                                                <Typography
                                                    variant={"subtitle2"}
                                                >
                                                    {itemAuthor}
                                                </Typography>
                                                <Typography
                                                    variant={"subtitle2"}
                                                >
                                                    {itemPublisher}
                                                </Typography>
                                                <Typography
                                                    variant={"subtitle2"}
                                                    sx={{ fontWeight: "bold" }}
                                                >
                                                    {`${Number.parseInt(
                                                        itemPrice,
                                                        10
                                                    ).toLocaleString()} 원`}
                                                </Typography>
                                                <Typography variant={"caption"}>
                                                    {itemPubDate}
                                                </Typography>
                                            </Stack>
                                        </CardContent>
                                    </Box>
                                </Card>
                            }
                        />
                    </ListItemButton>
                </ListItem>
            </>
        );

        return isItemLoaded(index) && displayItems;
    }

    /* 한글 입력 시 정상적으로 검색되지 않는 문제 (IME Composition)로 해당 메세드 추가
     * https://github.com/facebook/react/issues/3926
     */
    const handleComposition = (event) => {
        if (!event.target.isComposing) {
            handleBookSearchArea(event);
        }
    };

    // 검색어 입력 시 상세 검색 페이지가 나타나도록 설정
    const handleBookSearchArea = (event) => {
        const inputValue = event.target.value;

        if (inputValue.length > 0) {
            setKeyword(inputValue);
            getBookInfo(1).then((data) => {
                setBookInformation(data);
            });
            searchKeywordArea.current.className = classes.bookSearchDisplayArea;
        } else {
            searchKeywordArea.current.className = classes.setHidden;
        }
    };

    // 검색어 입력 시 api 호출
    const getBookInfo = async (atStart) => {
        if (keyword != null && keyword !== "") {
            const response = await searchBookInfo(
                searchType,
                keyword,
                itemCount,
                atStart
            );

            return response.data;
        }
        return [];
    };

    // 검색결과 클릭 시 내용 입력 설정
    const setBookInfoFromSearchResult = (bookInfo) => {
        setIsInsertSuccess(false);
        // 책 정보 입력 처리
        values.bookIsbn = bookInfo.itemIsbn;
        values.bookTitle = bookInfo.itemTitle;
        values.bookAuthor = bookInfo.itemAuthor;
        values.bookPublisher = bookInfo.itemPublisher;
        values.bookThumbnail = bookInfo.itemThumbnail;
        values.bookListPrice = bookInfo.itemPrice;
        values.bookPubDate = bookInfo.itemPubDate;
        values.bookSummary = bookInfo.itemSummary;

        // 입력 후 영역 숨김 처리
        searchKeywordArea.current.className = classes.setHidden;

        // 입력 완료 알림
        displayAlertEmptyBookInfo();

        // 화면 refresh를 위한 state 설정
        setIsInsertSuccess(true);
    };

    // lazy Loading 설정
    const isItemLoaded = (index) => !!bookInformation[index];

    // 추가 검색 필요 시 동작 기능 구현
    const getMoreBookInfo = async (startIndex, stopIndex) => {
        const offset = Math.ceil(stopIndex / itemCount);

        getBookInfo(offset).then((data) => {
            bookInformation.push(data);

            setBookInformation(bookInformation);
        });
    };

    const displayAlertEmptyBookInfo = () => {
        if (
            values.bookTitle === "" &&
            !!errors.bookTitle &&
            touched.bookTitle
        ) {
            return (
                <FormHelperText error={!!errors.bookTitle}>
                    책 정보가 입력되지 않았습니다.
                </FormHelperText>
            );
        } else if (values.bookTitle !== "") {
            return (
                <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert>
                        <Typography component={"p"} variant={"subtitle1"}>
                            도서 정보가 입력되었습니다.
                        </Typography>
                        <Typography component={"p"} variant={"caption"}>
                            제목 : {values.bookTitle}
                        </Typography>
                    </Alert>
                </Stack>
            );
        }

        return "";
    };

    return (
        <>
            <Paper className={classes.postTitle} elevation={6}>
                <InputField
                    fullWidth
                    name={title.name}
                    label={title.label}
                    variant={"outlined"}
                />
            </Paper>
            <Paper className={classes.formArea} elevation={6}>
                <Typography variant={"h6"}>도서 정보 검색</Typography>
                {displayAlertEmptyBookInfo()}
                <Grid container rowGap={2}>
                    <Grid item sm={2} sx={{ pr: 2 }}>
                        <NativeSelect
                            fullWidth
                            variant={"filled"}
                            defaultValue={bookSearchTypes[0].value}
                            label={bookSearchType.label}
                            inputProps={{
                                name: "bookSearchType",
                                identity: "searchType-native"
                            }}
                            sx={{ height: "inherit", marginTop: "16px" }}
                            onChange={(element) =>
                                setSearchType(element.target.value)
                            }
                        >
                            {bookSearchTypes.map((item, index) => (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </NativeSelect>
                    </Grid>
                    <Grid item sm={8}>
                        <TextField
                            fullWidth
                            variant={"standard"}
                            label={"검색어"}
                            placeholder={"검색어를 입력해주세요."}
                            onCompositionEnd={handleComposition}
                            onChange={handleBookSearchArea}
                            type={"text"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchOutlined color={"disabled"} />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                </Grid>
                <Paper
                    elevation={6}
                    ref={searchKeywordArea}
                    className={classes.setHidden}
                >
                    {/* https://github.com/bvaughn/react-window , https://codesandbox.io/s/5wqo7z2np4?file=/src/App.js 확인 필요 */}
                    {bookInformation.length <= 0 ? (
                        <Typography variant={"body2"}>
                            조회된 데이터가 없습니다.
                        </Typography>
                    ) : (
                        <InfiniteLoader
                            isItemLoaded={isItemLoaded}
                            itemCount={itemCount}
                            loadMoreItems={getMoreBookInfo}
                        >
                            {({ onItemsRendered, ref }) => (
                                <FixedSizeList
                                    height={500}
                                    width={"100%"}
                                    itemSize={104}
                                    itemCount={itemCount}
                                    onItemsRendered={onItemsRendered}
                                    ref={ref}
                                >
                                    {renderRow}
                                </FixedSizeList>
                            )}
                        </InfiniteLoader>
                    )}
                </Paper>
            </Paper>
        </>
    );
}
