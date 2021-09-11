import React, { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import {
    Box,
    Button,
    Card,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Link,
    Typography
} from "@material-ui/core";
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";
import RegisterForm from "../components/register/RegisterForm";
import registerImage from "../static/images/book_joinus.jpg";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
        display: "flex",
        marginTop: theme.spacing(10)
    }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: "100%",
    maxWidth: 464,
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: theme.spacing(10, 0, 2, 2)
}));

const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(6, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
    const [termsOpen, setTermsOpen] = useState(false);

    const handleOpen = () => setTermsOpen(true);
    const handleClose = () => setTermsOpen(false);

    return (
        <RootStyle title="회원가입 | Herb Book Store">
            <Grid container spacing={2}>
                <Grid item md={3}>
                    <MHidden width="mdDown">
                        <SectionStyle>
                            <Typography variant="h3" sx={{ px: 5, mb: 5 }}>
                                Herb Book Store에 <br />
                                중고책을 등록해보세요.
                            </Typography>
                            <img alt="register" src={registerImage} />
                            <Typography variant="caption" textAlign="right">
                                Photo by{" "}
                                <a href="https://unsplash.com/@youthreee?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                                    YJ Lee
                                </a>{" "}
                                on{" "}
                                <a href="https://unsplash.com/s/photos/book-store?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                                    Unsplash
                                </a>
                            </Typography>
                        </SectionStyle>
                    </MHidden>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Container>
                        <ContentStyle>
                            <Box sx={{ mb: 5 }}>
                                <Typography variant="h4" gutterBottom>
                                    회원가입
                                </Typography>
                                <Typography sx={{ color: "text.secondary" }}>
                                    찾고 있는 책이 있으시다면 이곳에서
                                    확인해보세요.
                                </Typography>
                            </Box>

                            <RegisterForm />

                            <Typography
                                variant={"caption"}
                                align="center"
                                sx={{ color: "text.secondary", mt: 3 }}
                            >
                                회원이 되시면, 허브 중고 서점(Herb Book Store)
                                &nbsp;
                                <Link
                                    underline="always"
                                    sx={{
                                        color: "text.primary",
                                        cursor: "pointer"
                                    }}
                                    onClick={handleOpen}
                                >
                                    회원약관
                                </Link>
                                에 동의한 것으로 간주합니다.
                            </Typography>
                        </ContentStyle>
                        <Container sx={{ textAlign: "right", pr: "1em" }}>
                            이미 회원이시라면? &nbsp;
                            <Link
                                underline="none"
                                variant="subtitle2"
                                component={RouterLink}
                                to="/login"
                            >
                                로그인
                            </Link>
                        </Container>
                    </Container>
                </Grid>
            </Grid>
            <Dialog
                open={termsOpen}
                scroll={"paper"}
                aria-labelledby="이용약관 팝업"
                aria-describedby="Herb Book Store 이용약관에 대해 알려드립니다."
            >
                <DialogTitle id="termsOfServiceTitle">이용약관</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText
                        id="termsOfServiceDescription"
                        tabIndex={-1}
                    >
                        제1조(목적) 이 약관은 Team Herb.(전자상거래 사업자)가
                        운영하는 허브 중고 서점 (이하 “몰”이라 한다)에서
                        제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를
                        이용함에 있어 사이버 몰과 이용자의 권리, 의무 및
                        책임사항을 규정함을 목적으로 합니다. ※「PC통신, 무선
                        등을 이용하는 전자상거래에 대해서도 그 성질에 반하지
                        않는 한 이 약관을 준용합니다.」
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </RootStyle>
    );
}
