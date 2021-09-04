import {
    Divider,
    Grid,
    ListItem,
    ListItemButton,
    ListItemText,
    NativeSelect,
    Paper,
    Typography
} from "@material-ui/core";
import React from "react";
import { LoadingButton } from "@material-ui/lab";
import { FixedSizeList } from "react-window";
// components
import { InputField } from "../../common/FormFields";
// styles
import useStyles from "../styles";
import palette from "../../../theme/palette";

const bookSearchTypes = [
    {
        value: "isbn",
        label: "ISBN"
    },
    {
        value: "name",
        label: "제목"
    },
    {
        value: "author",
        label: "저자"
    }
];

export default function BookSearchForm(props) {
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
            bookSearchType,
            bookSearchKeyword
        }
    } = props;

    function renderRow(rowProps) {
        const { index, style } = rowProps;

        return (
            <ListItem
                style={style}
                key={index}
                component={"div"}
                disablePadding
            >
                <ListItemButton>
                    <ListItemText
                        primary={`책 제목 ${index + 1}`}
                        secondary={`${bookIsbn.label} / ${
                            bookAuthor.label
                        } / ${new Date().toLocaleString()}`}
                    />
                </ListItemButton>
            </ListItem>
        );
    }

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
                                id: "searchType-native"
                            }}
                            sx={{ height: "inherit", marginTop: "16px" }}
                        >
                            {bookSearchTypes.map((item, index) => (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </NativeSelect>
                    </Grid>
                    <Grid item sm={8}>
                        <InputField
                            fullWidth
                            variant={"standard"}
                            name={bookSearchKeyword.name}
                            label={bookSearchKeyword.label}
                            placeholder={bookSearchKeyword.placeMsg}
                        />
                    </Grid>
                    <Grid item sm={2} textAlign={"center"}>
                        <LoadingButton
                            variant={"contained"}
                            color={"info"}
                            sx={{ height: "inherit", marginTop: "16px" }}
                        >
                            검색
                        </LoadingButton>
                    </Grid>
                </Grid>
                <Paper
                    elevation={6}
                    sx={{
                        width: "80%",
                        marginTop: "1em",
                        marginLeft: "4vw",
                        bgcolor: palette.grey[100]
                    }}
                >
                    {/* https://github.com/bvaughn/react-window , https://codesandbox.io/s/5wqo7z2np4?file=/src/App.js 확인 필요 */}
                    <FixedSizeList
                        height={500}
                        width={"100%"}
                        itemSize={60}
                        itemCount={200}
                        overscanCount={5}
                    >
                        {renderRow}
                    </FixedSizeList>
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
                    />

                    <InputField
                        name={bookTitle.name}
                        label={bookTitle.label}
                        disabled
                    />

                    <InputField
                        name={bookAuthor.name}
                        label={bookAuthor.label}
                        disabled
                    />

                    <InputField
                        name={bookPublisher.name}
                        label={bookPublisher.label}
                        disabled
                    />

                    <InputField
                        name={bookPubDate.name}
                        label={bookPubDate.label}
                        disabled
                    />

                    <InputField
                        name={bookListPrice.name}
                        label={bookListPrice.label}
                        disabled
                    />

                    <InputField
                        name={bookThumbnail.name}
                        label={bookThumbnail.label}
                        disabled
                    />

                    <InputField
                        multiline
                        maxRows={4}
                        name={bookSummary.name}
                        label={bookSummary.label}
                        disabled
                    />
                </Grid>
                <div>{JSON.stringify(props, null, 2)}</div>
            </Paper>
        </>
    );
}
