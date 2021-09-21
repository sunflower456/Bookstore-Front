import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
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
import { updateMyInfo } from "../../lib/api";
import { checkMyInfo } from "../../modules/auth";

export default function MemberInfo() {
    const [isEditable, setIsEditable] = useState(false);
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
    }, [isEditable]);

    let userId = "";
    let userName = "";
    let userEmail = "";
    let userPhone = "";

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
                            />
                        </Badge>
                        <Typography variant={"h6"}>ID : {userId}</Typography>
                    </Grid>
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
