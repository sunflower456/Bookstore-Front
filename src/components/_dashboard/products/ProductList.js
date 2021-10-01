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
    console.log("props ", props);

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

    const updateStateParam = (payload) => {
        return new Promise((resolve) => {
            setParamPage({
                paramPage: payload
            });
        });
    };

    const fetchAllData = async () => {
        console.log("parampage : ", paramPage);

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

        if (data.length !== 0) {
            await updateState(data);

            return data;
        }
        return data;
    };

    useEffect(() => {
        console.log("useEffect props : ", props);
        if (props.content) {
            fetchSearchedDataByTitle();
        }
        console.log("after search : ", items);

        if (items.length !== 0 && items !== undefined) {
            console.log(items);
            if (
                items.items &&
                items.items.length !== 0 &&
                items.items !== undefined
            ) {
                const pageCal = Math.floor(items.items.length / paramSize);

                setParamPage(pageCal);
                setProductList(
                    <Grid container spacing={3}>
                        {items.items.map((product, idx) => (
                            <Grid key={idx} item xs={12} sm={6} md={3}>
                                <ShopProductCard product={product} id={idx} />
                            </Grid>
                        ))}
                    </Grid>
                );
            } else {
                const pageCal = Math.floor(items.length / paramSize);

                setParamPage(pageCal);
                setProductList(
                    <Grid container spacing={3}>
                        {items.map((product, idx) => (
                            <Grid key={idx} item xs={12} sm={6} md={3}>
                                <ShopProductCard product={product} id={idx} />
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
            console.log(items);
            if (
                items.items &&
                items.items.length !== 0 &&
                items.items !== undefined
            ) {
                const pageCal = Math.floor(items.items.length / paramSize);

                setParamPage(pageCal);
                setProductList(
                    <Grid container spacing={3}>
                        {items.items.map((product, idx) => (
                            <Grid key={idx} item xs={12} sm={6} md={3}>
                                <ShopProductCard product={product} id={idx} />
                            </Grid>
                        ))}
                    </Grid>
                );
            } else {
                const pageCal = Math.floor(items.length / paramSize);

                setParamPage(pageCal);
                setProductList(
                    <Grid container spacing={3}>
                        {items.map((product, idx) => (
                            <Grid key={idx} item xs={12} sm={6} md={3}>
                                <ShopProductCard product={product} id={idx} />
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

    // useImperativeHandle(ref, () => ({
    //     reload() {
    //         setItems(props.products);
    //     }
    // }));

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
