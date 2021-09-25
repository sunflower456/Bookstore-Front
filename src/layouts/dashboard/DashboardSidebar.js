import PropTypes from "prop-types";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@material-ui/core/styles";
import {
    Avatar,
    Box,
    Button,
    Drawer,
    Stack,
    Typography
} from "@material-ui/core";
import { LogoutRounded, VpnKeyRounded } from "@material-ui/icons";
// components
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
import { MHidden } from "../../components/@material-extend";
//
import sidebarConfig from "./SidebarConfig";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("lg")]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
    }
}));

const AccountStyle = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({
    isOpenSidebar,
    onCloseSidebar,
    isAuthorized,
    myInfo,
    onLogout
}) {
    const { pathname } = useLocation();

    const renderContent = (
        <Scrollbar
            sx={{
                height: "100%",
                "& .simplebar-content": {
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                }
            }}
        >
            <Box sx={{ px: 2.5, py: 3 }}>
                <Box
                    component={RouterLink}
                    to="/"
                    sx={{ display: "inline-flex" }}
                >
                    <Logo />
                </Box>
            </Box>

            {isAuthorized && myInfo && <NavSection navConfig={sidebarConfig} />}

            <Box
                sx={{
                    px: 2.5,
                    pb: 3,
                    mt: "10vh"
                }}
            >
                {
                    <Stack direction={"column"}>
                        {isAuthorized && myInfo && (
                            <>
                                <Stack direction={"row"}>
                                    <Avatar
                                        variant={"rounded"}
                                        alt={myInfo.identity}
                                        src={myInfo.profileImage}
                                    />
                                    <Stack direction={"column"} sx={{ ml: 2 }}>
                                        <Typography variant={"subtitle1"}>
                                            {myInfo.identity}
                                        </Typography>
                                        <Typography variant={"subtitle2"}>
                                            ({myInfo.name} 님)
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Button
                                    fullWidth
                                    onClick={onLogout}
                                    variant={"contained"}
                                    color={"error"}
                                    sx={{ mt: 3 }}
                                    startIcon={<LogoutRounded />}
                                >
                                    로그아웃
                                </Button>
                            </>
                        )}
                        {!isAuthorized && !myInfo && (
                            <Button
                                fullWidth
                                component={RouterLink}
                                variant={"contained"}
                                color={"primary"}
                                to="/login"
                                sx={{ mt: 3 }}
                                startIcon={<VpnKeyRounded />}
                            >
                                로그인
                            </Button>
                        )}
                    </Stack>
                }
            </Box>
        </Scrollbar>
    );

    return (
        <RootStyle>
            <MHidden width="lgUp">
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: { width: DRAWER_WIDTH }
                    }}
                >
                    {renderContent}
                </Drawer>
            </MHidden>

            <MHidden width="lgDown">
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            bgcolor: "background.default"
                        }
                    }}
                >
                    {renderContent}
                </Drawer>
            </MHidden>
        </RootStyle>
    );
}
