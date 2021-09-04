import React from "react";
import PropTypes from "prop-types";

// Material-UI, React UI framework
import { makeStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { CheckCircle, RemoveShoppingCart, Shop } from "@material-ui/icons";
import { Avatar, Stack } from "@material-ui/core";

/* 표기할 데이터
- postId (행마다 고유의 key가 필요함)
- 중고책 썸네일 (bookRequest.bookThumbnail)
- 게시글 제목 (title)
- 중고책 제목 (bookRequest.bookTitle)
- 중고책 가격 (price)
- 판매자 아이디 (postIdentity)
- 주문 정보 상태 (postStatus)
* */
function createData(
    postId,
    bookThumbnail,
    title,
    bookTitle,
    price,
    postIdentity,
    postStatus
) {
    return {
        postId,
        bookThumbnail,
        title,
        bookTitle,
        price,
        postIdentity,
        postStatus
    };
}

const rows = [
    createData(
        1,
        "test.jpg",
        "테스트책 팝니다.",
        "테스트책",
        5000,
        "tester1",
        "판매중"
    ),
    createData(
        2,
        "test2.jpg",
        "테스트책 팝니다.2",
        "테스트책2",
        6000,
        "tester2",
        "예약중"
    ),
    createData(
        3,
        "test.jpg",
        "테스트책 팝니다.",
        "테스트책",
        5000,
        "tester1",
        "판매완료"
    ),
    createData(
        4,
        "test2.jpg",
        "테스트책 팝니다.2",
        "테스트책2",
        6000,
        "tester2",
        "SALE"
    ),
    createData(
        5,
        "test.jpg",
        "테스트책 팝니다.",
        "테스트책",
        5000,
        "tester1",
        "SALE"
    ),
    createData(
        6,
        "test2.jpg",
        "테스트책 팝니다.2",
        "테스트책2",
        6000,
        "tester2",
        "SALE"
    ),
    createData(
        7,
        "test.jpg",
        "테스트책 팝니다.",
        "테스트책",
        5000,
        "tester1",
        "SALE"
    ),
    createData(
        8,
        "test2.jpg",
        "테스트책 팝니다.2",
        "테스트책2",
        6000,
        "tester2",
        "SALE"
    ),
    createData(
        9,
        "test.jpg",
        "테스트책 팝니다.",
        "테스트책",
        5000,
        "tester1",
        "SALE"
    ),
    createData(
        10,
        "test2.jpg",
        "테스트책 팝니다.2",
        "테스트책2",
        6000,
        "tester2",
        "SALE"
    ),
    createData(
        11,
        "test.jpg",
        "테스트책 팝니다.",
        "테스트책",
        5000,
        "tester1",
        "SALE"
    ),
    createData(
        12,
        "test2.jpg",
        "테스트책 팝니다.2",
        "테스트책2",
        6000,
        "tester2",
        "SALE"
    )
];

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);

        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
    return order === "desc"
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
    {
        id: "bookThumbnail",
        numeric: false,
        disablePadding: false,
        label: "사진"
    },
    {
        id: "title",
        numeric: false,
        disablePadding: false,
        label: "제목"
    },
    {
        id: "bookTitle",
        numeric: false,
        disablePadding: false,
        label: "도서명"
    },
    {
        id: "price",
        numeric: true,
        disablePadding: false,
        label: "가격"
    },
    {
        id: "postIdentity",
        numeric: false,
        disablePadding: false,
        label: "판매자"
    },
    {
        id: "postStatus",
        numeric: false,
        disablePadding: false,
        label: "상태"
    },
    {
        id: "likePost",
        numeric: false,
        disablePadding: false,
        label: ""
    }
];

function EnhancedTableHead(props) {
    const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headRows.map((row) => (
                    <TableCell
                        key={row.id}
                        align={"center"}
                        padding={row.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={createSortHandler(row.id)}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    highlight:
        theme.palette.type === "light"
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.info.dark
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.info.light
            },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: "0 0 auto"
    }
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { rowSelectedNum, rowSelected } = props;

    return (
        <Toolbar
            className={{
                [classes.highlight]: rowSelectedNum > 0
            }}
        >
            <div className={classes.title}>
                {rowSelectedNum > 0 ? (
                    <Stack direction={"column"}>
                        <a href={"#"}>
                            <Typography color="inherit" variant="h6">
                                {rowSelected}
                            </Typography>
                        </a>
                    </Stack>
                ) : (
                    ""
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {rowSelectedNum > 0 ? (
                    <Stack direction={"row"}>
                        <Tooltip title="확정">
                            <IconButton aria-label="Confirm">
                                확정 <CheckCircle />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="구매">
                            <IconButton aria-label="Delete">
                                구매 <Shop />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="취소">
                            <IconButton aria-label="Cancel">
                                취소 <RemoveShoppingCart />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list" />
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

// EnhancedTableToolbar.propTypes = {
//
// };

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3)
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750
    },
    tableWrapper: {
        overflowX: "auto"
    }
}));

export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("postId");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === "desc";

        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(property);
    }

    function handleClick(event, rowId) {
        const selectedIndex = selected.indexOf(rowId);
        const newSelected = [];

        // 선택 배열이 비어있는 경우에는 새로 입력
        if (selected.length === 0 || selectedIndex === -1) {
            newSelected.push(rowId);
        }

        setSelected(newSelected);
    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    function handleChangeDense(event) {
        setDense(event.target.checked);
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                        stickyHeader
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getSorting(order, orderBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    const labelId = `${row.postId} / ${row.title}`;
                                    const isItemSelected = isSelected(labelId);

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) =>
                                                handleClick(event, labelId)
                                            }
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.postId}
                                            selected={isItemSelected}
                                        >
                                            <TableCell align="center">
                                                {row.bookThumbnail}
                                            </TableCell>
                                            <TableCell
                                                align={
                                                    row.numeric
                                                        ? "right"
                                                        : "left"
                                                }
                                            >
                                                <a href={"#"}>{row.title}</a>
                                            </TableCell>
                                            <TableCell
                                                align={
                                                    row.numeric
                                                        ? "right"
                                                        : "left"
                                                }
                                            >
                                                {row.bookTitle}
                                            </TableCell>
                                            <TableCell
                                                align={
                                                    row.numeric
                                                        ? "right"
                                                        : "left"
                                                }
                                            >
                                                {row.price}
                                            </TableCell>
                                            <TableCell
                                                align={
                                                    row.numeric
                                                        ? "right"
                                                        : "left"
                                                }
                                            >
                                                <Stack direction={"row"}>
                                                    <Avatar />
                                                    {row.postIdentity}
                                                </Stack>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                {row.postStatus}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={rows.length}
                    labelRowsPerPage={"페이지 당 출력"}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page"
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
