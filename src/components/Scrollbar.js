import PropTypes from "prop-types";
// material
import { styled } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

// ----------------------------------------------------------------------

const RootStyle = styled("div")({
    flexGrow: 1,
    height: "100%",
    overflow: "hidden"
});

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
    children: PropTypes.node.isRequired,
    sx: PropTypes.object
};

export default function Scrollbar({ children, sx, ...other }) {
    const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );

    if (isMobile) {
        return (
            <Box sx={{ overflowX: "auto", ...sx }} {...other}>
                {children}
            </Box>
        );
    }

    return <RootStyle>{children}</RootStyle>;
}
