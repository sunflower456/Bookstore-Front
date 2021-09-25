import * as Yup from "yup";
import registerFormModel from "./registerFormModel";

const {
    formField: { name, email, phoneNumber },
    resetPasswordField: { oldPassword, newPassword, newPasswordCheck }
} = registerFormModel;

const emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; // 이메일 형식

export default [
    Yup.object().shape({
        [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
        [phoneNumber.name]: Yup.string()
            .required(`${phoneNumber.requiredErrorMsg}`)
            .test(
                "numberLengthCheck",
                `${phoneNumber.invalidErrorMsg}`,
                (phoneNum) => {
                    const numberLength =
                        phoneNum == null
                            ? 0
                            : phoneNum.replace(/-|_/g, "").length;
                    const isMobileNum =
                        phoneNum == null ? false : phoneNum.startsWith("010");

                    return (
                        isMobileNum &&
                        (numberLength === 10 || numberLength === 11)
                    );
                }
            ),
        [email.name]: Yup.string()
            .required(`${email.requiredErrorMsg}`)
            .matches(emailRegEx, `${email.invalidErrorMsg}`)
    }),
    Yup.object().shape({
        [oldPassword.name]: Yup.string().required(
            `${oldPassword.requiredErrorMsg}`
        ),
        [newPassword.name]: Yup.string().required(
            `${newPassword.requiredErrorMsg}`
        ),
        [newPasswordCheck.name]: Yup.string()
            .required(`${newPasswordCheck.requiredErrorMsg}`)
            .oneOf(
                [Yup.ref(newPassword.name), null],
                "입력한 비밀번호와 일치하지 않습니다."
            )
    })
];
