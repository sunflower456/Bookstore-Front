import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import React, {
    useState,
    useEffect,
    useCallback,
    forwardRef,
    useImperativeHandle
} from "react";

import { Grid } from "@material-ui/core";

import ShopProductCard from "./ProductCard";

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
            const data = await fetch(
                `${baseURL}/api/post?size=${encodeURIComponent(
                    paramSize
                )}&page=${encodeURIComponent(paramPage)}`,
                {
                    method: "GET",
                    headers: myHeaders
                }
            ).then((response) => response.json());

            if (data.length !== 0) {
                await updateState(data);

                return data;
            }
            return data;
        } else {
            const data = await fetch(
                `${baseURL}/api/post?size=${encodeURIComponent(
                    paramSize
                )}&page=${encodeURIComponent(paramPage)}`,
                {
                    method: "GET",
                    headers: myHeaders
                }
            ).then((response) => response.json());

            if (data.length !== 0) {
                tempItems = data;
                return data;
            }
            return data;
        }
    };

    // title로 검색할 때
    const fetchSearchedDataByTitle = async () => {
        const data = await fetch(
            `${baseURL}/api/post?title=${encodeURIComponent(
                props.content.content
            )}&size=${paramSize}&page=0`,
            {
                method: "GET",
                headers: myHeaders
            }
        ).then((response) => response.json());

        await setItems(data);
        return data;
    };

    // author 로 검색할 때
    const fetchSearchedDataByAuthor = async () => {
        const data = await fetch(
            `${baseURL}/api/post?author=${encodeURIComponent(
                props.content.content
            )}&size=${paramSize}&page=0`,
            {
                method: "GET",
                headers: myHeaders
            }
        ).then((response) => response.json());

        await setItems(data);
        return data;
    };

    // publisher로 검색할 때
    const fetchSearchedDataByPublisher = async () => {
        const data = await fetch(
            `${baseURL}/api/post?publisher=${encodeURIComponent(
                props.content.content
            )}&size=${paramSize}&page=0`,
            {
                method: "GET",
                headers: myHeaders
            }
        ).then((response) => response.json());

        await setItems(data);
        return data;
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
