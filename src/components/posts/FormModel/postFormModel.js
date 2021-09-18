export default {
    formId: "postFormModel",
    formField: {
        title: {
            name: "title",
            label: "제목",
            placeMsg: "제목을 입력해주세요.",
            requiredErrorMsg: "제목이 입력되지 않았습니다."
        },
        price: {
            name: "price",
            label: "판매 가격 *",
            placeMsg: "판매 가격을 입력해주세요.",
            requiredErrorMsg: "가격은 필수 입력입니다.",
            invalidErrorMsg: "가격은 0원 이하로 설정할 수 없습니다."
        },
        description: {
            name: "description",
            label: "부가 설명",
            invalidErrorMsg: "최대 500자까지 입력 가능합니다."
        },
        bookStatus: {
            name: "bookStatus",
            label: "책 상태",
            requiredErrorMsg: "책 상태는 필수 입력 항목입니다."
        },
        bookPhoto: {
            name: "bookPhoto",
            label: "판매책 사진",
            invalidErrorMsg: "사진은 최대 3장까지 업로드 가능합니다."
        },
        bookIsbn: {
            name: "bookIsbn",
            label: "ISBN",
            requiredErrorMsg: "ISBN이 입력되지 않았습니다."
        },
        bookTitle: {
            name: "bookTitle",
            label: "제목",
            requiredErrorMsg: "제목이 입력되지 않았습니다."
        },
        bookAuthor: {
            name: "bookAuthor",
            label: "저자",
            requiredErrorMsg: "저자가 입력되지 않았습니다."
        },
        bookPublisher: {
            name: "bookPublisher",
            label: "출판사",
            requiredErrorMsg: "출판사가 입력되지 않았습니다."
        },
        bookThumbnail: {
            name: "bookThumbnail",
            label: "썸네일"
        },
        bookListPrice: {
            name: "bookListPrice",
            label: "정가",
            requiredErrorMsg: "정가가 입력되지 않았습니다."
        },
        bookPubDate: {
            name: "bookPubDate",
            label: "출판일",
            requiredErrorMsg: "출판일이 입력되지 않았습니다."
        },
        bookSummary: {
            name: "bookSummary",
            label: "책설명"
        },
        bookSearchType: {
            name: "searchType",
            label: "분류"
        }
    }
};
