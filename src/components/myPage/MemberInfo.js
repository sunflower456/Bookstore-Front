import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Alert,
    Avatar,
    Badge,
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    Input,
    Stack,
    Typography
} from "@material-ui/core";
import { AddPhotoAlternateRounded, Close, Edit } from "@material-ui/icons";
import { LoadingButton } from "@material-ui/lab";
import { Form, Formik } from "formik";
import { useStyle } from "./styles";
import palette from "../../theme/palette";
import ValidationSchema from "./FormModel/validationSchema";
import RegisterFormModel from "./FormModel/registerFormModel";
import MyInfoForm from "./Forms/MyInfoForm";
import { profileUpload, updateMyInfo } from "../../lib/api";
import { checkMyInfo } from "../../modules/auth";
import * as api from "../../lib/api";

export default function MemberInfo() {
    const [isEditable, setIsEditable] = useState(false);
    const [isUploadImageFail, setIsUploadImageFail] = useState(false);
    const [uploadFailMessage, setUploadFailMessage] = useState("");

    const classes = useStyle();

    const { formId, formField } = RegisterFormModel;

    const navigate = useNavigate();

    // store dispatch 사용
    const dispatch = useDispatch();

    // store에서 내 정보 가져오기
    const { myInfo } = useSelector(({ auth }) => ({
        myInfo: auth.myInfo
    }));

    // myInfo 변경 시 최신화처리 (checkMyInfo)
    useEffect(() => {
        dispatch(checkMyInfo());
    }, [isEditable, isUploadImageFail]);

    let userId = "";
    let userName = "";
    let userEmail = "";
    let userPhone = "";
    let userImage = "";

    let myInfoFormValues = {
        [formField.identity.name]: "",
        [formField.name.name]: "",
        [formField.email.name]: "",
        [formField.phoneNumber.name]: ""
    };

    if (myInfo != null) {
        userId = myInfo.identity;
        userName = myInfo.name;
        userEmail = myInfo.email;
        userPhone = myInfo.phoneNumber;
        userImage = myInfo.profileImage;
        myInfoFormValues = {
            [formField.identity.name]: userId,
            [formField.name.name]: userName,
            [formField.email.name]: userEmail,
            [formField.phoneNumber.name]: userPhone
        };
    }

    const FormInitialValue = myInfoFormValues;

    function _sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function _handleSubmit(values, actions) {
        const name = values.name;
        const phoneNumber = values.phoneNumber;
        const email = values.email;

        try {
            await updateMyInfo(name, phoneNumber, email);

            actions.setSubmitting(false);
            setIsEditable(!isEditable);
        } catch (e) {
            console.log(e.response.data);
            // eslint-disable-next-line no-alert
            alert("서버 오류가 발생하였습니다.");
        }
    }

    const validationSchema = ValidationSchema[0];

    const handleUserImage = useCallback((element) => {
        try {
            // 허용되는 파일은 하나만 처리 가능
            if (
                element.target.files == null ||
                element.target.files.length > 1
            ) {
                throw new Error("이미지는 하나만 선택 가능합니다.");
            }

            const files = element.target.files;
            const inputImage = files[0];
            const typeCheckRegEx = /^image/i;

            const type = inputImage.type;

            // image/* 타입만 허용하도록 설정
            if (!type.match(typeCheckRegEx)) {
                throw new Error("이미지 이외에는 허용되지 않습니다.");
            }
            // 이미지 용량 제한 설정 (<=2mb)
            if (inputImage.size > 2_097_152) {
                throw new Error("이미지는 최대 2mb까지 업로드 가능합니다.");
            }

            // 이미지 업로드 처리
            onUserImageUpload(inputImage);
        } catch (e) {
            console.log(e);
            setIsUploadImageFail(true);
            setUploadFailMessage(e.message);
        }
    }, []);

    // 사용자 이미지 업로드 오류 메시지 표시
    function displayErrorAlert() {
        return (
            <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert
                    severity={"error"}
                    onClose={() => {
                        setIsUploadImageFail(false);
                        setUploadFailMessage("");
                    }}
                >
                    {uploadFailMessage}
                </Alert>
            </Stack>
        );
    }

    // 사용자 이미지 업로드 처리
    const onUserImageUpload = async (image) => {
        const formData = new FormData();

        formData.append("profileImage", image);
        try {
            await api.profileUpload(formData);
            setIsUploadImageFail(false);
        } catch (e) {
            setIsUploadImageFail(true);
            if (e.response.status === 400) {
                setUploadFailMessage("잘못된 요청입니다.");
            } else if (e.response.status === 401) {
                setUploadFailMessage("로그인이 필요합니다.");
            } else if (e.response.status === 403) {
                setUploadFailMessage("접근 권한이 없습니다.");
            } else {
                setUploadFailMessage(e.response.data.message);
            }
        }
    };

    return (
        <Card className={classes.cardArea}>
            <CardHeader
                title={<Typography variant={"h4"}>개인정보</Typography>}
                subheader={
                    <Typography variant={"body2"}>
                        회원가입 시 입력한 정보를 관리할 수 있습니다.
                    </Typography>
                }
                action={
                    <>
                        <IconButton
                            aria-label={"toggle-edit-mode"}
                            onClick={() => {
                                setIsEditable(!isEditable);
                            }}
                        >
                            {!isEditable ? <Edit /> : <Close />}
                        </IconButton>
                    </>
                }
            />
            <Divider variant={"middle"} />
            <CardContent>
                <Grid container rowGap={2}>
                    <Grid
                        container
                        direction={"column"}
                        alignContent={"center"}
                    >
                        <Badge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right"
                            }}
                            badgeContent={
                                <>
                                    <Input
                                        accept="image/*"
                                        id="icon-button-file"
                                        name="icon-button-file"
                                        type="file"
                                        sx={{ display: "none" }}
                                        onChange={handleUserImage}
                                    />
                                    <label htmlFor="icon-button-file">
                                        <IconButton
                                            component="span"
                                            color="primary"
                                        >
                                            <AddPhotoAlternateRounded
                                                color={"info"}
                                            />
                                        </IconButton>
                                    </label>
                                </>
                            }
                        >
                            <Avatar
                                variant={"square"}
                                sx={{ width: "80px", height: "80px" }}
                                alt={userId}
                                src={userImage}
                            />
                        </Badge>
                        <Typography variant={"h6"}>ID : {userId}</Typography>
                    </Grid>
                    {isUploadImageFail && displayErrorAlert()}
                    <React.Fragment>
                        {isEditable ? (
                            <Formik
                                initialValues={FormInitialValue}
                                validationSchema={validationSchema}
                                onSubmit={_handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form id={formId} style={{ width: "100%" }}>
                                        <MyInfoForm
                                            formField={formField}
                                            information={myInfo}
                                        />
                                        <Box
                                            sx={{
                                                margin: "1vh 0",
                                                textAlign: "right"
                                            }}
                                        >
                                            <LoadingButton
                                                loading={isSubmitting}
                                                type="submit"
                                                variant="contained"
                                                color={"primary"}
                                            >
                                                저장
                                            </LoadingButton>
                                        </Box>
                                    </Form>
                                )}
                            </Formik>
                        ) : (
                            <React.Fragment>
                                <Grid container>
                                    <Grid container>
                                        <Grid item xs />
                                        <Grid item xs={3}>
                                            <Typography
                                                color={palette.grey["500"]}
                                            >
                                                이름 :
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography>{userName}</Typography>
                                        </Grid>
                                        <Grid item xs />
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs />
                                        <Grid item xs={3}>
                                            <Typography
                                                color={palette.grey["500"]}
                                            >
                                                이메일 :
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography>{userEmail}</Typography>
                                        </Grid>
                                        <Grid item xs />
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs />
                                        <Grid item xs={3}>
                                            <Typography
                                                color={palette.grey["500"]}
                                            >
                                                전화번호 :
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography>{userPhone}</Typography>
                                        </Grid>
                                        <Grid item xs />
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Grid>
            </CardContent>
        </Card>
    );
}
