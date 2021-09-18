import PropTypes from "prop-types";
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
    useImperativeHandle(ref, () => ({
        reload() {
            setItems(props.products);
        }
    }));

    ProductList.propTypes = {
        products: PropTypes.array.isRequired
    };

    const [items, setItems] = useState(props.products);
    const [page, setPage] = useState(1);

    const handleScroll = useCallback(() => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        const { scrollTop } = document.documentElement;

        if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
            setItems(items.concat(props.products));
            setPage((prevPage) => prevPage + 1);
        }
    });

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, true);
        return () => {
            window.removeEventListener("scroll", handleScroll, false);
        };
    }, [handleScroll]);

    useEffect(() => {
        if (props.products.products) {
            setItems(props.products.products);
        } else {
            setItems(props.products);
        }
    }, [props.products]);

    return (
        <Grid container spacing={3}>
            {items.map((product, idx) => (
                <Grid key={idx} item xs={12} sm={6} md={3}>
                    <ShopProductCard product={product} id={product.index} />
                </Grid>
            ))}
        </Grid>
    );
});

export default ProductList;
