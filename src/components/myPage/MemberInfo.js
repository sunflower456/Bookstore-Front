import React, { useState } from "react";
import {
    Avatar,
    Badge,
    Box,
    Card,
    CardContent,
    CardHeader,
    Container,
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
import FormInitialValues from "./FormModel/formInitialValues";
import palette from "../../theme/palette";
import ValidationSchema from "./FormModel/validationSchema";
import RegisterFormModel from "./FormModel/registerFormModel";
import MyInfoForm from "./Forms/MyInfoForm";

export default function MemberInfo() {
    const [isEditable, setIsEditable] = useState(false);
    const classes = useStyle();

    const { identity, memberName, phoneNumber, email } = FormInitialValues;
    const { formId, formField } = RegisterFormModel;

    function _sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function _handleSubmit(values, actions) {
        await _sleep(1000);
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);

        setIsEditable(!isEditable);
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
                        <Typography variant={"h6"}>ID : {identity}</Typography>
                    </Grid>
                    <React.Fragment>
                        {isEditable ? (
                            <Formik
                                initialValues={FormInitialValues}
                                validationSchema={validationSchema}
                                onSubmit={_handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form id={formId} style={{ width: "100%" }}>
                                        <MyInfoForm formField={formField} />
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
                                    <Grid item xs={6}>
                                        <Typography color={palette.grey["500"]}>
                                            이름 :
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{memberName}</Typography>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography
                                                color={palette.grey["500"]}
                                            >
                                                이메일 :
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>{email}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography
                                                color={palette.grey["500"]}
                                            >
                                                전화번호 :
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>
                                                {phoneNumber}
                                            </Typography>
                                        </Grid>
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
