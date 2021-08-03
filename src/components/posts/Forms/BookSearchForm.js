import {
    Divider,
    Grid,
    ListItem,
    ListItemButton,
    ListItemText,
    NativeSelect,
    Paper,
    Typography
} from '@material-ui/core';
import React from 'react';
import {LoadingButton} from '@material-ui/lab';
import {FixedSizeList} from 'react-window';
// components
import {InputField} from '../../common/FormFields';
// styles
import useStyles from '../styles';
import palette from '../../../theme/palette';

const bookSearchTypes = [
    {
        value: 'isbn',
        label: 'ISBN'
    },
    {
        value: 'name',
        label: '제목'
    },
    {
        value: 'author',
        label: '저자'
    }
];

export default function BookSearchForm(props) {
    const classes = useStyles();
    const {
        formField: {
            postTitle,
            bookSearchType,
            bookSearchKeyword,
            bookISBN,
            bookTitle,
            bookAuthor,
            bookPublisher,
            bookPublishingDate,
            bookPrice
        }
    } = props;

    function renderRow(props) {
        const {index, style} = props;

        return (
            <ListItem style={style} key={index} component={'div'} disablePadding>
                <ListItemButton>
                    <ListItemText
                        primary={`책 제목 ${index + 1}`}
                        secondary={`${bookISBN.label} / ${bookAuthor.label} / ${new Date().toLocaleString()}`}
                    />
                </ListItemButton>
            </ListItem>
        );
    }

    return (
        <Paper className={classes.formArea} elevation={6}>
            <Typography variant={'h6'}>
                도서 정보 검색
            </Typography>
            <Grid container rowGap={2}>
                <Grid item sm={2} sx={{pr: 2}}>
                    <NativeSelect
                        fullWidth
                        variant={'filled'}
                        defaultValue={bookSearchTypes[0].value}
                        label={bookSearchType.label}
                        inputProps={{
                            name: 'bookSearchType',
                            id: 'searchType-native'
                        }}
                        sx={{height: 'inherit', marginTop: '16px'}}
                    >
                        {bookSearchTypes.map((item, index) => (
                            <option key={index} value={item.value}>{item.label}</option>
                        ))}
                    </NativeSelect>
                </Grid>
                <Grid item sm={8}>
                    <InputField
                        fullWidth
                        variant={'standard'}
                        name={bookSearchKeyword.name}
                        label={bookSearchKeyword.label}
                        placeholder={bookSearchKeyword.placeMsg}
                    />
                </Grid>
                <Grid item sm={2} textAlign={'center'}>
                    <LoadingButton
                        variant={'contained'}
                        color={'success'}
                        sx={{height: 'inherit', marginTop: '16px'}}
                    >
                        검색
                    </LoadingButton>
                </Grid>
            </Grid>
            <Paper
                elevation={6}
                sx={{
                    width: '90%',
                    marginTop: '1em',
                    marginLeft: '1vw',
                    bgcolor: palette.grey[200],
                }}

            >
                {/* https://github.com/bvaughn/react-window , https://codesandbox.io/s/5wqo7z2np4?file=/src/App.js 확인 필요 */}
                <FixedSizeList
                    height={500}
                    width={'inherit'}
                    itemSize={60}
                    itemCount={200}
                    overscanCount={5}
                >
                    {renderRow}
                </FixedSizeList>
            </Paper>
            <Grid
                container
                direction={'row'}
                rowGap={3}
                columnGap={3}
                divider={<Divider orientation="vertical" flexItem/>}
                justifyContent={'center'}
            >
                <InputField
                    name={bookISBN.name}
                    label={bookISBN.label}
                    disabled
                >
                </InputField>
                <InputField
                    name={bookTitle.name}
                    label={bookTitle.label}
                    disabled
                >
                </InputField>
                <InputField
                    name={bookAuthor.name}
                    label={bookAuthor.label}
                    disabled
                >
                </InputField>
                <InputField
                    name={bookPublisher.name}
                    label={bookPublisher.label}
                    disabled
                >
                </InputField>
                <InputField
                    name={bookPublishingDate.name}
                    label={bookPublishingDate.label}
                    disabled
                >
                </InputField>
                <InputField
                    name={bookPrice.name}
                    label={bookPrice.label}
                    disabled
                >
                </InputField>
            </Grid>
        </Paper>
    );
}