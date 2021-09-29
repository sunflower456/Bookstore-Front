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
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);
    const [productList, setProductList] = useState(
        <div>
            <h1>NULL</h1>
        </div>
    );

    const { accessToken, myInfo } = useSelector(({ auth }) => ({
        accessToken: auth.accessToken,
        myInfo: auth.myInfo
    }));

    const updateState = (payload) => {
        return new Promise((resolve) => {
            setItems({
                items: payload
            });
        });
    };

    const fetchData = async () => {
        const myHeaders = new Headers();

        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        const data = await fetch(
            "http://localhost:8080/api/post/naverBookAPI?title=%EC%B1%85%20%EC%A0%9C%EB%AA%A9",
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
        fetchData();
        if (items.length !== 0 && items !== undefined) {
            if (items.items) {
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
        }
    }, [items]);

    useImperativeHandle(ref, () => ({
        reload() {
            setItems(props.products);
        }
    }));

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
                    setItems(items.items.concat(items.items));
                } else {
                    setItems(items.concat(items));
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

    // useEffect(() => {
    //     if (props.products.products) {
    //         setItems(props.products.products);
    //     } else {
    //         setItems(props.products);
    //     }
    // }, []);

    return <>{productList}</>;
});

export default ProductList;
