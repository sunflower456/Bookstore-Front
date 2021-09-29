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
    // store 상태 조회
    const { accessToken, myInfo } = useSelector(({ auth }) => ({
        accessToken: auth.accessToken,
        myInfo: auth.myInfo
    }));

    const myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    fetch(
        "http://localhost:8080/api/post/naverBookAPI?title=%EC%B1%85%20%EC%A0%9C%EB%AA%A9",
        {
            method: "GET",
            headers: myHeaders
        }
    )
        .then((response) => response.json())
        .then((response) => {
            // PRODUCTS = response;
            console.log(response);
            // PRODUCT_NAME.concat(PRODUCTS);
        });

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
