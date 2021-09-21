import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Alert,
    Avatar,
    Button,
    Container,
    Stack,
    TextField,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { VpnKeyRounded } from "@material-ui/icons";
import HerbLogo from "../../static/images/herbLogo.png";
import Copyright from "../common/Copyright";
import { checkMyInfo, login } from "../../modules/auth";

const useStyles = makeStyles((theme) => ({
    centerBox: {
        margin: theme.spacing(10, 2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(2)
    },
    title: {
        marginTop: theme.spacing(2)
    },
    submitButton: {
        margin: theme.spacing(3, 0, 0)
    }
}));

function Login() {
    // 상태값 설정
    const [identity, setIdentity] = useState("");
    const [password, setPassword] = useState("");
    const [loginFail, setLoginFail] = useState(false);

    // react-router v6 에서 history 접근 방식 변경
    // https://reacttraining.com/blog/react-router-v6-pre/
    const navigate = useNavigate();

    // store dispatch 사용
    const dispatch = useDispatch();

    // store 상태 조회
    const { accessToken, myInfo } = useSelector(({ auth }) => ({
        accessToken: auth.accessToken,
        myInfo: auth.myInfo
    }));

    // accessToken 확인
    useEffect(() => {
        if (accessToken != null && accessToken instanceof Error) {
            setLoginFail(true);
        } else if (accessToken) {
            setLoginFail(false);
            dispatch(checkMyInfo());
        }
    }, [accessToken, dispatch]);

    // 내 정보 확인
    useEffect(() => {
        if (myInfo) {
            navigate("/");
        }
    }, [myInfo, navigate]);

    // login 처리
    const onSignIn = (inputIdentity, inputPassword) => {
        try {
            dispatch(
                login({ identity: inputIdentity, password: inputPassword })
            );
        } catch (e) {
            console.log(`onSignIn 로그인 오류 : ${e}`);
        }
    };

    const classes = useStyles();

    // id, password 입력 설정
    const handleChangeIdentity = useCallback((e) => {
        setIdentity(e.target.value);
    }, []);
    const handleChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    // submit 기능 처리
    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            if (identity != null && password != null) {
                onSignIn(identity, password);
            }
        },
        [identity, password, onSignIn]
    );

    // 오류 메시지 표시
    function displayErrorAlert() {
        return (
            <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity={"error"} onClose={() => setLoginFail(false)}>
                    로그인에 실패하였습니다. <br /> 입력정보를 다시 확인 후
                    시도해주세요.
                </Alert>
            </Stack>
        );
    }

    return (
        <Container component={"main"} maxWidth={"xs"}>
            <div className={classes.centerBox}>
                <Avatar
                    className={classes.large}
                    alt={"Herb Book Store"}
                    src={HerbLogo}
                />
                <Typography
                    className={classes.title}
                    component={"h1"}
                    variant={"h4"}
                >
                    허브 중고 서점
                </Typography>
                {loginFail ? displayErrorAlert() : <div />}
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        margin="dense"
                        color="primary"
                        id="id"
                        label="아이디"
                        type="text"
                        name="identity"
                        placeholder="아이디를 입력하세요."
                        autoFocus
                        onChange={handleChangeIdentity}
                    />
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        margin="dense"
                        color="primary"
                        id="pw"
                        label="비밀번호"
                        type="password"
                        name="password"
                        placeholder="비밀번호를 입력하세요."
                        onChange={handleChangePassword}
                    />
                    <div align={"center"}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            startIcon={<VpnKeyRounded />}
                        >
                            로그인
                        </Button>
                    </div>
                </form>
            </div>
            <Copyright />
        </Container>
    );
}

export default Login;
