import React, { useState, useEffect, forwardRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { Grid } from "@material-ui/core";
import ShopProductCard from "./ProductCard";

import * as api from "../../../lib/api";

const ProductList = forwardRef((props) => {
    const [page, setPage] = useState(0);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tag, setTag] = useState(
        <Grid>
            <h1>데이터가 없습니다.</h1>
        </Grid>
    );

    const paramSize = 12;
    const [paramPage, setParamPage] = useState(0);
    const [ref, inView] = useInView();

    const fetchAllData = async () => {
        // 초기 값일땐 items 에 result 바로 넣어줌
        try {
            await api
                .getAllPosts(paramSize, paramPage)
                .then((response) => {
                    setItems(response.data);
                    console.log(response.data);
                })
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

    // title로 검색할 때
    const fetchSearchedDataByTitle = async () => {
        try {
            await api
                .getAllPostsByTitle(paramSize, props.content.content)
                .then((response) => setItems(response.data))
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

    // author 로 검색할 때
    const fetchSearchedDataByAuthor = async () => {
        try {
            await api
                .getAllPostsByAuthor(paramSize, props.content.content)
                .then((response) => setItems(response.data))
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

    // publisher로 검색할 때
    const fetchSearchedDataByPublisher = async () => {
        try {
            await api
                .getAllPostsByPublisher(paramSize, props.content.content)
                .then((response) => setItems(response.data))
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

    useEffect(() => {
        if (props.content) {
            if (props.search === 10) {
                // title로 검색할때
                fetchSearchedDataByTitle();
            } else if (props.search === 20) {
                // 저자로 검색할 때
                fetchSearchedDataByAuthor();
            } else {
                // 출판사로 검색할 때
                fetchSearchedDataByPublisher();
            }
        }
    }, [props]);

    useEffect(() => {
        fetchAllData();
    }, []);

    useEffect(() => {
        setTag(
            <Grid container>
                {items.map((product) => (
                    <Grid
                        ref={ref}
                        key={product.postId}
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        style={{ padding: "10px" }}
                    >
                        <ShopProductCard
                            product={product}
                            id={product.postId}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    }, [items]);

    // 서버에서 아이템을 가지고 오는 함수
    const getItems = useCallback(async () => {
        try {
            setLoading(true);
            await api
                .getAllPosts(paramSize, page)
                .then((response) => {
                    setItems(items.concat(response.data));
                })
                .catch((err) => {
                    if (err.response == null) {
                        alert(err.message);
                    } else {
                        console.log(err.response.message);
                    }
                });
            setLoading(false);
        } catch (e) {
            if (e.response == null) {
                alert(e.message);
            } else {
                console.log(e.response.message);
            }
        }
    }, [page]);

    // `getItems` 가 바뀔 때 마다 함수 실행
    useEffect(() => {
        getItems();
    }, [getItems]);

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            const pageCal = Math.floor(items.length / paramSize);

            setPage(pageCal);
        }
    }, [inView, loading]);

    return <>{tag}</>;
});

export default ProductList;
