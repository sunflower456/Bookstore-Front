import React, {useState} from 'react';
import {Form, Formik} from 'formik';
import {Navigate} from 'react-router-dom';
import useStyles from './styles';
// material
import {Button, Step, StepLabel, Stepper} from '@material-ui/core';
import {LoadingButton} from '@material-ui/lab';
// components
import MemberForm from './Forms/MemberForm';
import BankAccountForm from './Forms/BankAccountForm';
import RegistrationReview from './Forms/RegistrationReview';
// formModels
import validationSchema from './FormModel/validationSchema'
import registerFormModel from './FormModel/registerFormModel'
import formInitialValues from './FormModel/formInitialValues'
import Welcome from './Forms/Welcome';

// 단계 설정
const steps = ['회원정보 입력', '계좌정보 입력', '가입정보 확인'];
const {formId, formField} = registerFormModel;

// step render
function _renderStepContent(step) {
    switch (step) {
        case 0:
            return <MemberForm formField={formField}/>;
        case 1:
            return <BankAccountForm formField={formField}/>;
        case 2:
            return <RegistrationReview />;
        default:
            return <Navigate to="/404" replace/>;
    }
}

// ----------------------------------------------------------------------

export default function RegisterForm() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = validationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;

    function _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function _submitForm(values, actions) {
        await _sleep(1000);
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
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <React.Fragment>
                {activeStep === steps.length ? (
                    <Welcome/>
                ) : (<Formik
                    initialValues={formInitialValues}
                    validationSchema={currentValidationSchema}
                    onSubmit={_handleSubmit}
                >
                    {({isSubmitting}) => (
                        <Form id={formId}>
                            {_renderStepContent(activeStep)}

                            <div className={classes.buttonArea}>
                                <div className={classes.wrapper}>
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
                                </div>
                                <div className={classes.wrapper}>
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
                            </div>
                        </Form>
                    )}
                </Formik>
                )}
            </React.Fragment>
        </React.Fragment>
    );
}