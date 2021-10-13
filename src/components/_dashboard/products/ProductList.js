import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import React, { useState, useEffect, useCallback, forwardRef } from "react";

import { Grid } from "@material-ui/core";
import ShopProductCard from "./ProductCard";

import * as api from "../../../lib/api";

const ProductList = forwardRef((props, ref) => {
    const [page, setPage] = useState(0);
    const [items, setItems] = useState([]);
    const [productList, setProductList] = useState(
        <div>
            <h1>데이터가 없습니다</h1>
        </div>
    );

    const paramSize = 12;
    const [paramPage, setParamPage] = useState(0);

    let tempItems = [];

    const { accessToken, myInfo } = useSelector(({ auth }) => ({
        accessToken: auth.accessToken,
        myInfo: auth.myInfo
    }));

    const myHeaders = new Headers();
    const baseURL = "http://localhost:8080";

    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const updateState = (payload) => {
        return new Promise((resolve) => {
            setItems({
                items: payload
            });
        });
    };

    const fetchAllData = async () => {
        // 초기 값일땐 items 에 result 바로 넣어줌
        if (paramPage === 0) {
            try {
                const data = await api
                    .getAllPosts(paramSize, paramPage)
                    .catch((err) => {
                        if (err.response == null) {
                            alert(err.message);
                        } else {
                            console.log(err.response.message);
                        }
                    });

                if (data.data.length !== 0) {
                    await updateState(data.data);

                    return data.data;
                }
                return data.data;
            } catch (e) {
                if (e.response == null) {
                    alert(e.message);
                } else {
                    console.log(e.response.message);
                }
            }
        } else {
            try {
                const data = await api
                    .getAllPosts(paramSize, paramPage)
                    .catch((err) => {
                        if (err.response == null) {
                            alert(err.message);
                        } else {
                            console.log(err.response.message);
                        }
                    });

                if (data.data.length !== 0) {
                    tempItems = data.data;
                    return data.data;
                }
                return data.data;
            } catch (e) {
                if (e.response == null) {
                    alert(e.message);
                } else {
                    console.log(e.response.message);
                }
            }
        }
        return null;
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
        console.log(items);
        if (items.length !== 0 && items !== undefined) {
            if (
                items.items &&
                items.items.length !== 0 &&
                items.items !== undefined
            ) {
                const pageCal = Math.floor(items.items.length / paramSize);

                setParamPage(pageCal);
                setProductList(
                    <Grid container spacing={3}>
                        {items.items.map((product) => (
                            <Grid
                                key={product.postId}
                                item
                                xs={12}
                                sm={6}
                                md={3}
                            >
                                <ShopProductCard
                                    product={product}
                                    id={product.postId}
                                />
                            </Grid>
                        ))}
                    </Grid>
                );
            } else {
                const pageCal = Math.floor(items.length / paramSize);

                setParamPage(pageCal);
                setProductList(
                    <Grid container spacing={3}>
                        {items.map((product) => (
                            <Grid
                                key={product.postId}
                                item
                                xs={12}
                                sm={6}
                                md={3}
                            >
                                <ShopProductCard
                                    product={product}
                                    id={product.postId}
                                />
                            </Grid>
                        ))}
                    </Grid>
                );
            }
        } else {
            setProductList(
                <div>
                    <h1>데이터가 없습니다</h1>
                </div>
            );
        }
    }, [props]);

    useEffect(() => {
        fetchAllData();
        if (items.length !== 0 && items !== undefined) {
            if (
                items.items &&
                items.items.length !== 0 &&
                items.items !== undefined
            ) {
                const pageCal = Math.floor(items.items.length / paramSize);

                setParamPage(pageCal);
                setProductList(
                    <Grid container spacing={3}>
                        {items.items.map((product) => (
                            <Grid
                                key={product.postId}
                                item
                                xs={12}
                                sm={6}
                                md={3}
                            >
                                <ShopProductCard
                                    product={product}
                                    id={product.postId}
                                />
                            </Grid>
                        ))}
                    </Grid>
                );
            } else {
                const pageCal = Math.floor(items.length / paramSize);

                setParamPage(pageCal);
                setProductList(
                    <Grid container spacing={3}>
                        {items.map((product) => (
                            <Grid
                                key={product.postId}
                                item
                                xs={12}
                                sm={6}
                                md={3}
                            >
                                <ShopProductCard
                                    product={product}
                                    id={product.postId}
                                />
                            </Grid>
                        ))}
                    </Grid>
                );
            }
        } else {
            setProductList(
                <div>
                    <h1>데이터가 없습니다</h1>
                </div>
            );
        }
    }, [items.length]);

    ProductList.propTypes = {
        products: PropTypes.array.isRequired
    };

    const handleScroll = useCallback(() => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        const { scrollTop } = document.documentElement;

        if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
            if (items.length !== 0) {
                if (items.items) {
                    setItems(items.items.concat(tempItems));
                } else {
                    setItems(items.concat(tempItems));
                }
            }
            setPage((prevPage) => prevPage + 1);
        }
    });

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, true);
        return () => {
            window.removeEventListener("scroll", handleScroll, false);
        };
    }, [handleScroll]);

    return <>{productList}</>;
});

export default ProductList;
