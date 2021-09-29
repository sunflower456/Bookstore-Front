import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Typography, Button, Stack } from "@material-ui/core";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Page from "../components/Page";
import { ProductList } from "../components/_dashboard/products";
// import PRODUCTS from "../_mocks_/products";
import Searchbar from "../layouts/dashboard/Searchbar";

// ----------------------------------------------------------------------

export default function EcommerceShop() {
    const [openFilter, setOpenFilter] = useState(false);
    const [content, setContent] = useState("");
    const [products, setProducts] = useState(null);
    // store 상태 조회
    const { accessToken, myInfo } = useSelector(({ auth }) => ({
        accessToken: auth.accessToken,
        myInfo: auth.myInfo
    }));

    async function _handleSubmit() {
        console.log("_handleSubmit parents");
        const myHeaders = new Headers();

        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        await fetch(
            "http://localhost:8080/api/post/naverBookAPI?title=%EC%B1%85%20%EC%A0%9C%EB%AA%A9",
            {
                method: "GET",
                headers: myHeaders
            }
        )
            .then((response) => response.json())
            .then((response) => {
                setProducts(response);
                console.log("products", response);
                return response;
            });
    }
    // _handleSubmit();

    const handleInputChange = (value) => {
        setContent({ content: value });
    };
    const handleInputClick = () => {
        // setProducts({
        //     products: products.filter((product) => {
        //         return product.name.includes(content.content);
        //     })
        // });
    };

    const onPageChange = () => {
        window.location.href = "/products/addPost";
    };

    return (
        <Page title="허브중고서점">
            <Container>
                <Typography variant="h1" sx={{ mb: 15 }}>
                    허브 중고 서점
                </Typography>
                <Button
                    size="large"
                    variant="contained"
                    style={{
                        marginBottom: "50px"
                    }}
                    onClick={onPageChange}
                >
                    중고책 등록&nbsp;
                    <ArrowRightIcon />
                </Button>
                <Searchbar
                    onChange={handleInputChange}
                    onClick={handleInputClick}
                />
                <Stack
                    direction="row"
                    flexWrap="wrap-reverse"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ mb: 5 }}
                ></Stack>
                <ProductList products={products} />
            </Container>
        </Page>
    );
}
