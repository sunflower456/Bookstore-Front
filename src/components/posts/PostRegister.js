import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {Form, Formik} from 'formik';
// material
import {Button, Paper, Step, StepLabel, Stepper} from '@material-ui/core';
import {LoadingButton} from '@material-ui/lab';
// components
import PostFormModel from './FormModel/postFormModel';
import validationSchema from './FormModel/validationSchema';
// style
import useStyles from './styles';
import formInitialValues from './FormModel/formInitialValues';
import BookSearchForm from './Forms/BookSearchForm';

const steps = ['책정보 입력', '판매글 입력', '등록 전 확인'];
const {formId, formField} = PostFormModel;

// step render
function _renderStepContent(step) {
    switch (step) {
        case 0:
            return <BookSearchForm formField={formField}/>;
        case 1:
            // return <BankAccountForm formField={formField}/>;
            return <div/>;
        case 2:
            // return <RegistrationReview />;
            return <div/>;
        default:
            return <Navigate to="/404" replace/>;
    }
}

// ----------------------------------------------------------------------

export default function PostRegister() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = validationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;

    async function _submitForm(values, actions) {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);

        setActiveStep(activeStep + 1);
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
            <Paper variant={'elevation'} elevation={6}>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Paper>
            <React.Fragment>
                {activeStep === steps.length ? (
                    <div>완료!</div>
                ) : (<Formik
                        initialValues={formInitialValues}
                        validationSchema={currentValidationSchema}
                        onSubmit={_handleSubmit}
                    >
                        {({isSubmitting}) => (
                            <Form id={formId}>
                                {_renderStepContent(activeStep)}

                                <div className={classes.buttonArea}>
                                    {activeStep !== 0 && (
                                        <Button
                                            type={'button'}
                                            variant={'contained'}
                                            onClick={_handleBack}
                                            className={classes.button}
                                            color={'info'}
                                        >
                                            이전
                                        </Button>
                                    )}


                                    <LoadingButton
                                        loading={isSubmitting}
                                        type="submit"
                                        variant="contained"
                                        color={isLastStep ? 'secondary' : 'primary'}
                                        className={classes.button}
                                    >
                                        {isLastStep ? '등록' : '다음'}
                                    </LoadingButton>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </React.Fragment>
        </React.Fragment>
    );
}