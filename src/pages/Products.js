import { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Typography, Button, Stack } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import Page from "../components/Page";
import { ProductList } from "../components/_dashboard/products";
import Searchbar from "../layouts/dashboard/Searchbar";

// ----------------------------------------------------------------------

export default function EcommerceShop() {
    const [content, setContent] = useState("");
    const [search, setSearch] = useState(10);

    // store 상태 조회
    const { accessToken, myInfo } = useSelector(({ auth }) => ({
        accessToken: auth.accessToken,
        myInfo: auth.myInfo
    }));
    const [productList, setProductList] = useState(<ProductList />);

    const handleInputChange = (value) => {
        setContent({ content: value });
    };
    const handleInputClick = () => {
        setProductList(<ProductList content={content} search={search} />);
    };

    const onPageChange = () => {
        window.location.href = "/products/addPost";
    };

    const handleSearchChange = (value) => {
        setSearch(value);
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
                    <ArrowRight />
                </Button>
                <Searchbar
                    onChange={handleInputChange}
                    onClick={handleInputClick}
                    onSearchChange={handleSearchChange}
                />
                <Stack
                    direction="row"
                    flexWrap="wrap-reverse"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ mb: 5 }}
                ></Stack>
                {productList}
            </Container>
        </Page>
    );
}
