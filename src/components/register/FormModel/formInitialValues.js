import RegisterFormModel from "./registerFormModel";

const {
    formField: { identity, password, passwordCheck, name, email, phoneNumber }
} = RegisterFormModel;

export default {
    [identity.name]: "",
    [password.name]: "",
    [passwordCheck.name]: "",
    [name.name]: "",
    [email.name]: "",
    [phoneNumber.name]: ""
};
