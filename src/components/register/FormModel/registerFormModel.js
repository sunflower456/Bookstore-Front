export default {
    formId: 'registerForm',
    formField: {
        id: {
            name: 'id',
            label: '아이디 *',
            placeMsg: '사용할 아이디를 입력하세요.',
            requiredErrorMsg: '아이디는 필수 입력입니다.',
        },
        password: {
            name: 'password',
            label: '비밀번호 *',
            placeMsg: '비밀번호를 입력해주세요.',
            requiredErrorMsg: '비밀번호는 빈 값이 허용되지 않습니다.'
        },
        passwordCheck: {
            name: 'passwordCheck',
            label: '비밀번호 확인 *',
            placeMsg: '입력한 비밀번호를 재입력',
            requiredErrorMsg: '비밀번호는 빈 값이 허용되지 않습니다.'
        },
        memberName: {
            name: 'memberName',
            label: '이름 *',
            placeMsg: '이름을 입력해주세요.',
            requiredErrorMsg: '이름은 필수 입력입니다.'
        },
        phone: {
            name: 'phone',
            label: '전화번호 *',
            placeMsg: '전화번호를 입력해주세요.',
            requiredErrorMsg: '전화번호는 필수 입력입니다.',
            invalidErrorMsg: '유효하지 않은 전화번호입니다.'
        },
        email: {
            name: 'email',
            label: '이메일 *',
            placeMsg: '이메일을 입력해주세요.',
            requiredErrorMsg: '이메일은 필수 입력입니다.',
            invalidErrorMsg: '유효하지 않은 이메일입니다.',
        },
        bankName: {
            name: 'bankName',
            label: '은행 *',
            requiredErrorMsg: '은행은 필수 입력입니다.'
        },
        bankAccountOwner: {
            name: 'accountOwner',
            label: '예금주 *',
            placeMsg: '예금주 성명',
            requiredErrorMsg: '예금주는 필수 입력입니다.',
        },
        bankAccountNumber: {
            name: 'accountNumber',
            label: '계좌번호 *',
            placeMsg: '거래에 사용될 계좌번호',
            requiredErrorMsg: '계좌번호는 필수 입력입니다.',
            invalidErrorMsg: '숫자 12~14자리 번호를 입력해주세요.',
        },
        zipNumber: {
            name: 'zipNo',
            label: '우편번호 *',
            requiredErrorMsg: '우편번호는 필수 입력입니다.',
            invalidErrorMsg: '숫자 5자리의 우편번호를 입력해주세요.'
        },
        roadAddress: {
            name: 'roadAddr',
            label: '도로명주소 *',
            placeMsg: '거래에 사용할 주소를 입력해주세요.',
            requiredErrorMsg: '도로명주소는 필수 입력입니다.',
        },
        roadAddressDetail: {
            name: 'roadAddrDetail',
            label: '상세주소 *',
            placeMsg: '세부 주소를 입력해주세요.',
            requiredErrorMsg: '상세주소는 필수 입력입니다.',
        }
    }
}