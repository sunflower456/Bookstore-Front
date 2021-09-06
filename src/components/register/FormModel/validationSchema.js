import * as Yup from "yup";
import registerFormModel from "./registerFormModel";

const {
    formField: { identity, password, passwordCheck, name, email, phoneNumber }
} = registerFormModel;

const emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; // 이메일 형식
const accountNumEx = /\d{12,14}/gm;
const zipNoRegEx = /\d{5}/;

export default [
    Yup.object().shape({
        [identity.name]: Yup.string()
            .max(15, "최대 15자리까지 입력 가능합니다.")
            .required(`${identity.requiredErrorMsg}`),
        [password.name]: Yup.string().required(`${password.requiredErrorMsg}`),
        [passwordCheck.name]: Yup.string()
            .required(`${passwordCheck.requiredErrorMsg}`)
            .oneOf(
                [Yup.ref(password.name), null],
                "입력한 비밀번호와 일치하지 않습니다."
            ),
        [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
        [email.name]: Yup.string()
            .required(`${email.requiredErrorMsg}`)
            .matches(emailRegEx, `${email.invalidErrorMsg}`),
        [phoneNumber.name]: Yup.string()
            .required(`${phoneNumber.requiredErrorMsg}`)
            // .matches(phoneNumberRegEx, `${phone.invalidErrorMsg}`),
            .test(
                "numberLengthCheck",
                `${phoneNumber.invalidErrorMsg}`,
                (phoneNum) => {
                    const numberLength =
                        phoneNum == null
                            ? 0
                            : phoneNum.replace(/[-_.]/g, "").length;
                    const isMobileNum =
                        phoneNum == null ? false : phoneNum.startsWith("010");

                    return (
                        isMobileNum &&
                        (numberLength === 10 || numberLength === 11)
                    );
                }
            )
    })
];
