import PropTypes from "prop-types";

import StarIcon from "@material-ui/icons/Star";
import { Link as RouterLink } from "react-router-dom";
// material
import { Box, Card, Link, Typography, Stack } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
// utils
import { fCurrency } from "../../../utils/formatNumber";
//
import Label from "../../Label";

// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
    top: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute"
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
    product: PropTypes.object
};

export default function ShopProductCard({ product, id }) {
    const {
        name,
        cover,
        price,
        status
        // priceSale
    } = product;

    console.log(status);
    return (
        <Card>
            <Box sx={{ pt: "100%", position: "relative" }}>
                {status ? (
                    <StarIcon style={{ color: "yellow" }} />
                ) : (
                    <StarIcon style={{ color: "blue", visibility: "hidden" }} />
                )}
                <ProductImgStyle
                    alt={name}
                    src={cover}
                    style={{ zIndex: "-1" }}
                />
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link
                    to={`/products/${id}`}
                    color="inherit"
                    underline="hover"
                    component={RouterLink}
                >
                    <Typography variant="subtitle2" noWrap>
                        {name}
                    </Typography>
                </Link>

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="subtitle1">
                        {fCurrency(price)}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}
