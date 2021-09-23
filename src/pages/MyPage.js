import { styled } from "@material-ui/core/styles";
import { Card, Grid } from "@material-ui/core";
import Page from "../components/Page";
import MemberInfo from "../components/myPage/MemberInfo";
import ResetPassword from "../components/myPage/ResetPassword";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    display: "flex",
    marginTop: theme.spacing(10)
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: "100%",
    maxWidth: 800,
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // margin: theme.spacing(10, 0, 2, 2),
    padding: theme.spacing(4)
}));

// ----------------------------------------------------------------------

export default function MyPage() {
    return (
        <RootStyle title="내 정보 | 허브 중고 서점">
            <Grid container justifyContent={"center"}>
                <SectionStyle>
                    <MemberInfo />
                    <ResetPassword />
                </SectionStyle>
            </Grid>
        </RootStyle>
    );
}
