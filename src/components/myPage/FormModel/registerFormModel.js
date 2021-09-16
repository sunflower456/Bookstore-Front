export default {
    formId: "registerForm",
    formField: {
        identity: {
            name: "identity"
        },
        name: {
            name: "name",
            label: "이름 : ",
            placeMsg: "수정할 이름을 입력해주세요.",
            requiredErrorMsg: "빈 값은 허용되지 않습니다."
        },
        email: {
            name: "email",
            label: "이메일 : ",
            placeMsg: "이메일을 입력해주세요.",
            requiredErrorMsg: "빈 값은 허용되지 않습니다.",
            invalidErrorMsg: "유효하지 않은 이메일입니다."
        },
        phoneNumber: {
            name: "phoneNumber",
            label: "전화번호 : ",
            placeMsg: "전화번호를 입력해주세요.",
            requiredErrorMsg: "빈 값은 허용되지 않습니다.",
            invalidErrorMsg: "유효하지 않은 전화번호입니다."
        }
    }
};
