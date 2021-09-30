import React, { useEffect, useState } from "react";
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
import Paper from "@material-ui/core/Paper";
import { Avatar, Link, ListItemButton, Tooltip } from "@material-ui/core";
import * as api from "../../../lib/api";

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
        id: "postImage",
        numeric: false,
        disablePadding: false,
        sortable: false,
        label: "사진"
    },
    {
        id: "postTitle",
        numeric: false,
        disablePadding: false,
        sortable: true,
        label: "제목"
    },
    {
        id: "bookTitle",
        numeric: false,
        disablePadding: false,
        sortable: true,
        label: "도서명"
    },
    {
        id: "postPrice",
        numeric: true,
        disablePadding: false,
        sortable: true,
        label: "가격"
    },
    {
        id: "postStatus",
        numeric: false,
        disablePadding: false,
        sortable: false,
        label: "상태"
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
                            onClick={
                                row.sortable ? createSortHandler(row.id) : null
                            }
                            hideSortIcon={!row.sortable}
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
    const [rows, setRows] = useState([]); // 조회 목록

    const getMySalePosts = async () => {
        try {
            await api
                .getMySalePosts()
                .then((response) => setRows(response.data))
                .catch((err) => {
                    if (err.response == null) {
                        alert(err.message);
                    } else {
                        console.log(err.response.message);
                    }
                });
        } catch (e) {
            if (e.response == null) {
                alert(e.message);
            } else {
                console.log(e.response.message);
            }
        }
    };

    // 목록 로딩 처리
    useEffect(() => {
        getMySalePosts();
    }, []);

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
                                    const labelId = `${row.postId} / ${row.postTitle}`;
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
                                                <Avatar
                                                    variant={"square"}
                                                    src={
                                                        row.postImage == null
                                                            ? ""
                                                            : row.postImage
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell
                                                align={
                                                    row.numeric
                                                        ? "right"
                                                        : "left"
                                                }
                                            >
                                                <Link
                                                    href={`/products/${row.postId}`}
                                                    underline={"hover"}
                                                >
                                                    {row.postTitle}
                                                </Link>
                                            </TableCell>
                                            <TableCell
                                                align={
                                                    row.numeric
                                                        ? "right"
                                                        : "left"
                                                }
                                                sx={{ maxWidth: "100px" }}
                                            >
                                                <Tooltip title={row.bookTitle}>
                                                    <ListItemButton
                                                        variant={"text"}
                                                        sx={{
                                                            width: "100%",
                                                            display: "block",
                                                            textAlign: "left",
                                                            whiteSpace:
                                                                "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow:
                                                                "ellipsis"
                                                        }}
                                                    >
                                                        {row.bookTitle}
                                                    </ListItemButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell
                                                align={
                                                    row.numeric
                                                        ? "right"
                                                        : "left"
                                                }
                                            >
                                                {row.postPrice}
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
