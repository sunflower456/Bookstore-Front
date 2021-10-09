import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Form, Formik } from "formik";
// material
import { Button, Paper, Step, StepLabel, Stepper } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
// components
import PostFormModel from "./FormModel/postFormModel";
import validationSchema from "./FormModel/validationSchema";
// style
import useStyles from "./styles";
import formInitialValues from "./FormModel/formInitialValues";
import BookSearchForm from "./Forms/BookSearchForm";
import PostForm from "./Forms/PostForm";
import * as api from "../../lib/api";

const steps = ["책정보 입력", "판매글 입력"];
const { formId, formField } = PostFormModel;

// step render
function _renderStepContent(step) {
    switch (step) {
        case 0:
            return <BookSearchForm formField={formField} />;
        case 1:
            return <PostForm formField={formField} />;
        case 2:
            return <Navigate to="/" replace />;
        default:
            return <Navigate to="/404" replace />;
    }
}

// ----------------------------------------------------------------------

export default function PostRegister() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = validationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;

    async function _submitForm(values, actions) {
        if (values == null || values.length <= 0) {
            throw new Error(
                "판매글 등록 데이터가 없습니다. 확인 후 다시 시도해주세요."
            );
        }

        // 책 정보 request 객체 생성
        const addPostReqeust = {
            bookRequest: {
                bookIsbn: values.bookIsbn,
                bookTitle: values.bookTitle,
                bookAuthor: values.bookAuthor,
                bookPublisher:
                    values.bookPublisher == null || values.bookPublisher === ""
                        ? "API 미제공"
                        : values.bookPublisher,
                bookThumbnail:
                    values.bookThumbnail == null || values.bookThumbnail === ""
                        ? "API 미제공"
                        : values.bookThumbnail,
                bookListPrice:
                    values.bookListPrice == null ? 0 : values.bookListPrice,
                bookPubDate:
                    values.bookPubDate == null || values.bookPubDate === ""
                        ? "API 미제공"
                        : values.bookPubDate,
                bookSummary:
                    values.bookSummary == null || values.bookSummary === ""
                        ? "API 미제공"
                        : values.bookSummary
            },
            title: values.title,
            price: values.price,
            bookStatus: values.bookStatus,
            description: values.description
        };

        // 데이터 전송 준비
        const formData = new FormData();

        if (values.bookPhoto.length > 0) {
            values.bookPhoto.map((photo) => formData.append("images", photo));
        }

        // 판매글 등록 request
        formData.append(
            "postRequest",
            new Blob([JSON.stringify(addPostReqeust)], {
                type: "application/json"
            })
        );

        try {
            await api.writePost(formData);

            alert("등록이 완료되었습니다.");
            // 상태 초기화 및 메인 페이지로 이동 처리
            actions.setSubmitting(false);
            setActiveStep(activeStep + 1);
        } catch (e) {
            if (e.response == null) {
                alert(e.message);
            } else if (e.response.status === 400) {
                alert("잘못된 요청입니다.");
            } else if (e.response.status === 401) {
                alert("로그인이 필요합니다.");
                history.push("/login");
            } else if (e.response.status === 403) {
                alert("접근 권한이 없습니다.");
                history.goBack();
            }
        }
    }

    function _handleSubmit(values, actions) {
        if (isLastStep) {
            _submitForm(values, actions);
        } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }

    return (
        <React.Fragment>
            <Paper variant={"elevation"} elevation={6}>
                <Stepper
                    activeStep={activeStep}
                    className={classes.stepper}
                    alternativeLabel
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Paper>
            <React.Fragment>
                <Formik
                    initialValues={formInitialValues}
                    validationSchema={currentValidationSchema}
                    onSubmit={_handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form id={formId}>
                            {_renderStepContent(activeStep)}

                            <div className={classes.buttonArea}>
                                {activeStep !== 0 && (
                                    <Button
                                        type={"button"}
                                        variant={"contained"}
                                        onClick={_handleBack}
                                        className={classes.button}
                                        color={"inherit"}
                                    >
                                        이전
                                    </Button>
                                )}

                                {/* <LoadingButton*/}
                                <LoadingButton
                                    loading={isSubmitting}
                                    type="submit"
                                    variant="contained"
                                    color={isLastStep ? "success" : "primary"}
                                    className={classes.button}
                                >
                                    {isLastStep ? "등록" : "다음"}
                                </LoadingButton>
                                {/* </LoadingButton>*/}
                            </div>
                        </Form>
                    )}
                </Formik>
            </React.Fragment>
        </React.Fragment>
    );
}
