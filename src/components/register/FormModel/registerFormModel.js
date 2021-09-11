export default {
    formId: "registerForm",
    formField: {
        identity: {
            name: "identity",
            label: "아이디 *",
            placeMsg: "사용할 아이디를 입력하세요.",
            requiredErrorMsg: "아이디는 필수 입력입니다."
        },
        password: {
            name: "password",
            label: "비밀번호 *",
            placeMsg: "비밀번호를 입력해주세요.",
            requiredErrorMsg: "비밀번호는 빈 값이 허용되지 않습니다."
        },
        passwordCheck: {
            name: "passwordCheck",
            label: "비밀번호 확인 *",
            placeMsg: "입력한 비밀번호를 재입력",
            requiredErrorMsg: "비밀번호는 빈 값이 허용되지 않습니다."
        },
        name: {
            name: "name",
            label: "이름 *",
            placeMsg: "이름을 입력해주세요.",
            requiredErrorMsg: "이름은 필수 입력입니다."
        },
        phoneNumber: {
            name: "phoneNumber",
            label: "전화번호 *",
            placeMsg: "전화번호를 입력해주세요.",
            requiredErrorMsg: "전화번호는 필수 입력입니다.",
            invalidErrorMsg: "유효하지 않은 전화번호입니다."
        },
        email: {
            name: "email",
            label: "이메일 *",
            placeMsg: "이메일을 입력해주세요.",
            requiredErrorMsg: "이메일은 필수 입력입니다.",
            invalidErrorMsg: "유효하지 않은 이메일입니다."
        }
    }
};
