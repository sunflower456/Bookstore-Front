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
    [bookSearchType.name] : '',
    [bookSearchKeyword.name] : '',
    [bookISBN.name] : '',
    [bookTitle.name] : '',
    [bookAuthor.name] : '',
    [bookPublisher.name] : '',
    [bookPublishingDate.name] : '',
    [bookPrice.name] : ''
};