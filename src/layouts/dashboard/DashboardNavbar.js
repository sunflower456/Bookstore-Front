import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
// material
import { alpha, styled } from "@material-ui/core/styles";
import { Box, Stack, AppBar, Toolbar, IconButton } from "@material-ui/core";
// components
import { MHidden } from "../../components/@material-extend";
//
import Searchbar from "./Searchbar";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up("lg")]: {
        minHeight: APPBAR_DESKTOP,
        padding: theme.spacing(0, 5)
    }
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
    onOpenSidebar: PropTypes.func
};

export default function DashboardNavbar({ onOpenSidebar }) {
    return (
        <div>
            <ToolbarStyle>
                <MHidden width="lgUp">
                    <IconButton
                        onClick={onOpenSidebar}
                        sx={{ mr: 1, color: "text.primary" }}
                    >
                        <Icon icon={menu2Fill} />
                    </IconButton>
                </MHidden>

                <Box sx={{ flexGrow: 1 }} />
            </ToolbarStyle>
        </div>
    );
}
