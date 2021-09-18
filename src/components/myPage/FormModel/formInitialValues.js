import RegisterFormModel from "./registerFormModel";

const {
    formField: { identity, name, email, phoneNumber }
} = RegisterFormModel;

export default {
    [identity.name]: "테스터1",
    [name.name]: "",
    [email.name]: "",
    [phoneNumber.name]: ""
};
