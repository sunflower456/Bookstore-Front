import { useFormik } from "formik";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
// material
import { Container, Typography, Button, Stack } from "@material-ui/core";
// components
import Page from "../components/Page";
import { ProductList } from "../components/_dashboard/products";
// import { PRODUCTS } from "../_mocks_/Products";

// ----------------------------------------------------------------------

export default function EcommerceShop() {
    const [openFilter, setOpenFilter] = useState(false);

    const formik = useFormik({
        initialValues: {
            gender: "",
            category: "",
            colors: "",
            priceRange: "",
            rating: ""
        },
        onSubmit: () => {
            setOpenFilter(false);
        }
    });

    return (
        <Page title="허브중고서점">
            <Container>
                <Typography variant="h4" sx={{ mb: 15 }}>
                    허브 중고 서점
                </Typography>
                {/* <ProductList products={PRODUCTS} /> */}
            </Container>
        </Page>
    );
}
