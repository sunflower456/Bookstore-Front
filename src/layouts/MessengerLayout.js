import { Link as RouterLink, Outlet } from "react-router-dom";
import { formatDistance, formatDistanceToNow, subMinutes } from "date-fns";
import { ko } from "date-fns/locale";
// material
import { Avatar, Box, Grid, Stack, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
// components
import Logo from "../components/Logo";
// etc
import tempImg from "../static/images/store_logo_green.png";

// ----------------------------------------------------------------------

const HeaderStyle = styled(Box)(({ theme }) => ({
    top: 0,
    left: 0,
    lineHeight: 0,
    width: "100%",
    position: "absolute",
    padding: theme.spacing(3, 3, 0),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(5, 5, 0)
    }
}));

// ----------------------------------------------------------------------

export default function MessengerLayout() {
    return (
        <>
            <HeaderStyle>
                <RouterLink to="/">
                    <Logo />
                </RouterLink>
            </HeaderStyle>
            <Outlet />
        </>
    );
}
