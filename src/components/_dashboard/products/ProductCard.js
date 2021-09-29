import PropTypes from "prop-types";

import { Link as RouterLink } from "react-router-dom";
// material
import { Box, Card, Link, Typography, Stack } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
// utils
import { fCurrency } from "../../../utils/formatNumber";

// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
    top: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    cursor: "pointer"
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
    product: PropTypes.object
};

export default function ShopProductCard({ product, id }) {
    const {
        bookTitle,
        bookThumbnail,
        bookListPrice
        // priceSale
    } = product;

    const imageLinkTo = () => {
        window.location.href = `/products/${id}`;
    };

    return (
        <Card>
            <Box
                sx={{ pt: "100%", position: "relative" }}
                style={{ height: "350px" }}
            >
                <ProductImgStyle
                    alt={bookTitle}
                    src={bookThumbnail}
                    onClick={imageLinkTo}
                />
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link
                    to={`/products/${id}`}
                    color="inherit"
                    underline="hover"
                    component={RouterLink}
                    style={{ marginBottom: "16px" }}
                >
                    <Typography variant="subtitle1" noWrap>
                        {bookTitle}
                    </Typography>
                </Link>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ marginTop: "0px" }}
                >
                    <Typography variant="body2" noWrap>
                        {bookTitle}
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ marginTop: "0px" }}
                >
                    <Typography variant="body2">박준</Typography>
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    style={{ marginTop: "0px" }}
                    justifyContent="space-between"
                >
                    <Typography variant="body2">문학동네</Typography>
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="subtitle1">
                        {fCurrency(bookListPrice)}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}
