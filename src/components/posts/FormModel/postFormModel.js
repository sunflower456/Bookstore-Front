export default {
    formId: 'postFormModel',
    formField: {
        postTitle: {
            name: 'postTitle',
            label: '제목',
            placeMsg: '제목을 입력해주세요.',
            requiredErrorMsg: '제목이 입력되지 않았습니다.',
        },
        bookSearchType: {
            name: 'searchType',
            label: '분류'
        },
        bookSearchKeyword: {
            name: 'searchKeyword',
            label: '검색어',
            placeMsg: '검색을 위한 키워드를 입력해주세요.',
            requiredErrorMsg: '빈 값은 입력할 수 없습니다.'
        },
        bookISBN: {
            name: 'bookISBN',
            label: 'ISBN',
            requiredErrorMsg: 'ISBN이 입력되지 않았습니다.'
        },
        bookTitle: {
            name: 'bookTitle',
            label: '제목',
            requiredErrorMsg: '제목이 입력되지 않았습니다.'
        },
        bookAuthor: {
            name: 'bookAuthor',
            label: '저자',
            requiredErrorMsg: '저자가 입력되지 않았습니다.'
        },
        bookPublisher: {
            name: 'bookPublisher',
            label: '출판사',
            requiredErrorMsg: '출판사가 입력되지 않았습니다.'
        },
        bookPublishingDate: {
            name: 'bookPublishingDate',
            label: '출판일',
            requiredErrorMsg: '출판일이 입력되지 않았습니다.'
        },
        bookPrice: {
            name: 'bookPrice',
            label: '정가',
            requiredErrorMsg: '정가가 입력되지 않았습니다.'
        },


    }
}