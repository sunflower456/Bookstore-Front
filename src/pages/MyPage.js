import { styled } from "@material-ui/core/styles";
import {
    Button,
    Card,
    CardHeader,
    Divider,
    Grid,
    Typography
} from "@material-ui/core";
import Page from "../components/Page";
// material
// components
// icons
import MemberInfo from "../components/myPage/MemberInfo";
import AccountsInfo from "../components/myPage/AccountsInfo";
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
    border: "1px solid black",
    margin: theme.spacing(10, 0, 2, 2),
    padding: theme.spacing(4)
}));

// ----------------------------------------------------------------------

export default function MyPage() {
    return (
        <RootStyle title="회원정보 | Herb Book Store">
            <Grid container justifyContent={"center"}>
                <SectionStyle>
                    <MemberInfo />
                    <AccountsInfo />
                    <ResetPassword />
                </SectionStyle>
            </Grid>
        </RootStyle>
    );
}
