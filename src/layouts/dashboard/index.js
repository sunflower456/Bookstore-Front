import { useState } from "react";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
// material
import { styled } from "@material-ui/core/styles";
//
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";
import { getAuthorized } from "../../modules/selector";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden"
});

const MainStyle = styled("div")(({ theme }) => ({
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up("lg")]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);

    /* sidebar 상에 로그인 정보 및 로그아웃 기능 추가 */
    const DashboardSidebarContainer = ({ isAuthorized, myInfo }) => {
        return (
            <DashboardSidebar
                isOpenSidebar={open}
                onCloseSidebar={() => setOpen(false)}
                myInfo={myInfo}
                isAuthorized={isAuthorized}
            />
        );
    };

    /* state 상에서 인증정보와 사용자 정보 전달 */
    const DashboardSidebarWithMyInfo = connect((state) => {
        return {
            isAuthorized: getAuthorized(state),
            myInfo: state.auth.myInfo
        };
    })(DashboardSidebarContainer);

    return (
        <RootStyle>
            <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
            <DashboardSidebarWithMyInfo />
            <MainStyle>
                <Outlet />
            </MainStyle>
        </RootStyle>
    );
}
