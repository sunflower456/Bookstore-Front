import * as Yup from "yup";
import registerFormModel from "./registerFormModel";

const {
    formField: { name, email, phoneNumber }
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
    })
];
