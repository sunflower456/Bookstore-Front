import PostFormModel from './postFormModel';

const {
    formField: {
        postTitle,
        bookSearchType,
        bookSearchKeyword,
        bookISBN,
        bookTitle,
        bookAuthor,
        bookPublisher,
        bookPublishingDate,
        bookPrice
    }
} = PostFormModel;

export default {
    [postTitle.name] : '',
    [bookSearchType.name] : 'name',
    [bookSearchKeyword.name] : '토비의',
    [bookISBN.name] : '123456',
    [bookTitle.name] : '토비의 스프링',
    [bookAuthor.name] : '토비',
    [bookPublisher.name] : '테스트출판사',
    [bookPublishingDate.name] : '2019.01.01',
    [bookPrice.name] : '65000'
};