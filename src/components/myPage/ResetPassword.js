import React, { useState } from "react";
import {
    Alert,
    Button,
    Card,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    SvgIcon,
    Typography
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Form, Formik } from "formik";
import { useStyle } from "./styles";
import { InputField } from "../common/FormFields";
import RegisterFormModel from "./FormModel/registerFormModel";
import ValidationSchema from "./FormModel/validationSchema";
import { modifyPassword } from "../../lib/api";

export default function ResetPassword() {
    const classes = useStyle();
    const [resetFormOpen, setResetFormOpen] = useState(false);
    const [isResetFail, setIsResetFail] = useState(false);
    const [resetFailMessage, setResetFailMessage] = useState("");
    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [isResetComplete, setIsResetComplete] = useState(false);

    const handleResetFormOpen = () => setResetFormOpen(true);
    const handleResetFormClose = () => {
        setResetFormOpen(false);
        setIsResetComplete(false);
    };

    const { resetFormId, resetPasswordField } = RegisterFormModel;
    const { oldPassword, newPassword, newPasswordCheck } = resetPasswordField;

    /* form 기본값 설정 */
    const resetPasswordFormInitValues = {
        [oldPassword.name]: "",
        [newPassword.name]: "",
        [newPasswordCheck.name]: ""
    };

    /* 입력값 체크 (validation) 설정 */
    const validationSchema = ValidationSchema[1];

    /* form submit 처리 */
    async function _handleSubmit(values, actions) {
        const inputOldPassword = values.oldPassword;
        const inputNewPassword = values.newPassword;

        try {
            if (inputOldPassword === inputNewPassword) {
                throw new Error(
                    "현재 비밀번호와 동일한 비밀번호로 설정할 수 없습니다."
                );
            }

            await modifyPassword(inputOldPassword, inputNewPassword);
            actions.setSubmitting(false);
            setIsResetFail(false);
            setIsResetComplete(true);
        } catch (e) {
            setIsResetFail(true);
            if (e.response == null) {
                setResetFailMessage(e.message);
            } else if (e.response.status === 400) {
                setResetFailMessage(
                    `현재 비밀번호 : ${e.response.data.message}`
                );
            } else if (e.response.status === 401) {
                setResetFailMessage("로그인이 필요합니다.");
            } else if (e.response.status === 403) {
                setResetFailMessage("접근 권한이 없습니다.");
            } else {
                setResetFailMessage(e.response.data.message);
            }
        }
    }

    // 비밀번호 수정 과정의 오류 메시지 표시
    function displayErrorAlert() {
        return (
            <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert
                    severity={"error"}
                    onClose={() => {
                        setIsResetFail(false);
                        setResetFailMessage("");
                    }}
                >
                    {resetFailMessage}
                </Alert>
            </Stack>
        );
    }

    // 비밀번호 수정 과정의 오류 메시지 표시
    function displaySuccessAlert() {
        return (
            <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert>비밀번호가 변경되었습니다.</Alert>
            </Stack>
        );
    }

    return (
        <>
            <Card className={classes.cardArea}>
                <CardHeader
                    title={
                        <Typography variant={"h4"}>비밀번호 재설정</Typography>
                    }
                    subheader={
                        <Typography variant={"body2"}>
                            새로운 비밀번호를 설정하실 수 있습니다.
                            <Typography variant={"caption"}>
                                (* 변경된 비밀번호는 이전 비밀번호로 복원할 수
                                없습니다.)
                            </Typography>
                        </Typography>
                    }
                />
                <Divider variant={"middle"} />
                <Button
                    fullWidth
                    type={"button"}
                    sx={{ marginTop: "1em" }}
                    variant={"text"}
                    color={"error"}
                    onClick={handleResetFormOpen}
                >
                    비밀번호 변경하기
                </Button>
            </Card>

            <Dialog
                open={resetFormOpen}
                aria-labelledby="reset-password-dialog-title"
                aria-describedby="reset-password-dialog-form"
            >
                <Formik
                    initialValues={resetPasswordFormInitValues}
                    validationSchema={validationSchema}
                    onSubmit={_handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form id={resetFormId} style={{ width: "100%" }}>
                            <DialogTitle id="reset-password-dialog-title">
                                비밀번호 변경하기
                            </DialogTitle>
                            <DialogContent>
                                <InputField
                                    fullWidth
                                    sx={{ margin: "1em 0" }}
                                    name={oldPassword.name}
                                    label={oldPassword.label}
                                    placeholder={oldPassword.placeMsg}
                                    type={showOldPass ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={() =>
                                                        setShowOldPass(
                                                            (prev) => !prev
                                                        )
                                                    }
                                                >
                                                    <SvgIcon
                                                        color={"disabled"}
                                                        component={
                                                            showOldPass
                                                                ? Visibility
                                                                : VisibilityOff
                                                        }
                                                    />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <InputField
                                    fullWidth
                                    margin="normal"
                                    name={newPassword.name}
                                    label={newPassword.label}
                                    placeholder={newPassword.placeMsg}
                                    type={showNewPass ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={() =>
                                                        setShowNewPass(
                                                            (prev) => !prev
                                                        )
                                                    }
                                                >
                                                    <SvgIcon
                                                        color={"disabled"}
                                                        component={
                                                            showNewPass
                                                                ? Visibility
                                                                : VisibilityOff
                                                        }
                                                    />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <InputField
                                    fullWidth
                                    name={newPasswordCheck.name}
                                    label={newPasswordCheck.label}
                                    placeholder={newPasswordCheck.placeMsg}
                                    type={"password"}
                                />
                            </DialogContent>
                            <DialogActions>
                                {!isResetComplete && (
                                    <Button
                                        onClick={handleResetFormClose}
                                        color={"inherit"}
                                    >
                                        취소
                                    </Button>
                                )}
                                {!isResetComplete ? (
                                    <LoadingButton
                                        loading={isSubmitting}
                                        type="submit"
                                    >
                                        변경
                                    </LoadingButton>
                                ) : (
                                    <Button
                                        onClick={handleResetFormClose}
                                        color={"success"}
                                    >
                                        확인
                                    </Button>
                                )}
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
                {isResetFail && displayErrorAlert()}
                {isResetComplete && displaySuccessAlert()}
            </Dialog>
        </>
    );
}
