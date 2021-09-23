import React, { useRef, useState } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Grid,
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
import { InputField } from "../../common/FormFields";
import useStyles from "../styles";
import dummyImage from "../../../static/images/herbLogo.png";
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
    const [keyword, setKeyword] = useState("");
    const [searchType, setSearchType] = useState("title");
    const [bookInformation, setBookInformation] = useState([]);

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
            itemIsbn = "";
            itemTitle = "";
            itemAuthor = "";
            itemPublisher = "";
            itemThumbnail = "";
            itemPrice = "";
            itemPubDate = "";
            itemSummary = "";
        } else {
            // .replace(/(<([^>]+)>)/ig,""); : 데이터 중 <b> 등의 엘리먼트가 섞여있어 이를 제거하고자함
            itemIsbn = bookInformation[index].bookIsbn;
            itemTitle = bookInformation[index].bookTitle.replace(
                /(<([^>]+)>)/gi,
                ""
            );
            itemAuthor = bookInformation[index].bookAuthor.replace(
                /(<([^>]+)>)/gi,
                ""
            );
            itemPublisher = bookInformation[index].bookPublisher.replace(
                /(<([^>]+)>)/gi,
                ""
            );
            itemThumbnail = bookInformation[index].bookThumbnail;
            itemPrice = bookInformation[index].bookListPrice;
            itemPrice = Number.parseInt(itemPrice, 10).toLocaleString();
            itemPubDate = bookInformation[index].bookPubDate;
            itemSummary = bookInformation[index].bookSummary.replace(
                /(<([^>]+)>)/gi,
                ""
            );
        }

        const displayItems = (
            <>
                <ListItem
                    style={style}
                    key={`book-${index}`}
                    value={bookInformation[index]}
                    component={"div"}
                    disablePadding
                >
                    <ListItemButton>
                        <ListItemText
                            sx={{ width: "100%", maxWidth: "33vw" }}
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
                                            flexDirection: "column"
                                        }}
                                    >
                                        <CardContent
                                            sx={{
                                                flex: "1 0 auto"
                                            }}
                                        >
                                            <Typography
                                                variant={"button"}
                                                noWrap
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
                                                    {`${itemPrice} 원`}
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

    // 검색어 입력 시 상세 검색 페이지가 나타나도록 설정
    const handleBookSearchArea = (element) => {
        const inputValue = element.target.value;

        if (inputValue.length > 0) {
            setKeyword(inputValue);
            getBookInfo();
            searchKeywordArea.current.className = classes.bookSearchDisplayArea;
        } else {
            searchKeywordArea.current.className = classes.setHidden;
        }
    };

    // 검색어 입력 시 api 호출
    const getBookInfo = async (startIndex, stopIndex) => {
        if (keyword != null && keyword !== "") {
            const response = await searchBookInfo(searchType, keyword);

            setBookInformation(response.data);
        }
    };

    // 추가 검색 필요 시 동작 기능 구현
    const getMoreBookInfo = async (startIndex, stopIndex) => {};

    // lazy Loading 설정
    const isItemLoaded = (index) => !!bookInformation[index];
    const itemCount = 10;

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
                <Grid
                    container
                    direction={"row"}
                    rowGap={3}
                    columnGap={3}
                    divider={<Divider orientation="vertical" flexItem />}
                    justifyContent={"center"}
                >
                    <InputField
                        name={bookIsbn.name}
                        label={bookIsbn.label}
                        disabled
                        sx={{ display: "none" }}
                    />

                    <InputField
                        name={bookTitle.name}
                        label={bookTitle.label}
                        disabled
                        sx={{ display: "none" }}
                    />

                    <InputField
                        name={bookAuthor.name}
                        label={bookAuthor.label}
                        disabled
                        sx={{ display: "none" }}
                    />

                    <InputField
                        name={bookPublisher.name}
                        label={bookPublisher.label}
                        disabled
                        sx={{ display: "none" }}
                    />

                    <InputField
                        name={bookPubDate.name}
                        label={bookPubDate.label}
                        disabled
                        sx={{ display: "none" }}
                    />

                    <InputField
                        name={bookListPrice.name}
                        label={bookListPrice.label}
                        disabled
                        sx={{ display: "none" }}
                    />

                    <InputField
                        name={bookThumbnail.name}
                        label={bookThumbnail.label}
                        disabled
                        sx={{ display: "none" }}
                    />

                    <InputField
                        multiline
                        maxRows={4}
                        name={bookSummary.name}
                        label={bookSummary.label}
                        disabled
                        sx={{ display: "none" }}
                    />
                </Grid>
            </Paper>
        </>
    );
}
