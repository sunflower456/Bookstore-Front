import RegisterFormModel from './registerFormModel';

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
} = RegisterFormModel;

export default {
    [id.name]: '',
    [password.name]: '',
    [passwordCheck.name]: '',
    [memberName.name]: '',
    [phone.name]: '',
    [email.name]: '',
    [bankName.name]: '',
    [bankAccountOwner.name]: '',
    [bankAccountNumber.name]: ''
};