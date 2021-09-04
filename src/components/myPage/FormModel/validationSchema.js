import * as Yup from 'yup';
import registerFormModel from './registerFormModel';

const {
    formField: {
        id,
        password,
        passwordCheck,
        memberName,
        phone,
        email,
        bankName,
        bankAccountOwner,
        bankAccountNumber
    }
} = registerFormModel;

const emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; // 이메일 형식
const accountNumEx = /\d{12,14}/gm;

export default [
    Yup.object().shape({
        [id.name] : Yup.string()
            .max(15, '최대 15자리까지 입력 가능합니다.')
            .required(`${id.requiredErrorMsg}`),
        [password.name] : Yup.string().required(`${password.requiredErrorMsg}`),
        [passwordCheck.name] : Yup.string()
            .required(`${passwordCheck.requiredErrorMsg}`)
            .oneOf([Yup.ref(password.name), null], '입력한 비밀번호와 일치하지 않습니다.'),
        [memberName.name] : Yup.string().required(`${memberName.requiredErrorMsg}`),
        [phone.name] : Yup.string()
            .required(`${phone.requiredErrorMsg}`)
            // .matches(phoneNumberRegEx, `${phone.invalidErrorMsg}`),
            .test('numberLengthCheck', `${phone.invalidErrorMsg}`,(phoneNum) => {
                let numberLength = phoneNum == null ? 0 : phoneNum.replace(/-|_/g, '').length;
                const isMobileNum = phoneNum == null ? false : phoneNum.startsWith('010');
                return isMobileNum && (numberLength === 10 || numberLength === 11);
            }),
        [email.name] : Yup.string()
            .required(`${email.requiredErrorMsg}`)
            .matches(emailRegEx, `${email.invalidErrorMsg}`)
    }),
    Yup.object().shape({
        [bankName.name]: Yup.string().required(`${bankName.requiredErrorMsg}`),
        [bankAccountOwner.name]: Yup.string().required(`${bankAccountOwner.requiredErrorMsg}`),
        [bankAccountNumber.name]: Yup.string().required(`${bankAccountNumber.requiredErrorMsg}`)
            .matches(accountNumEx, `${bankAccountNumber.invalidErrorMsg}`)
            .max(14, '최대 14자리까지 입력 가능합니다.')
            .test('numberLengthCheck', `${bankAccountNumber.invalidErrorMsg}`,(accountNumber) => {
                let length = accountNumber == null ? 0 : accountNumber.length;
                return length >= 12 && length <= 14
            })
    })
];