import PostFormModel from './postFormModel';

const {
    formField: {
        title,
        price,
        description,
        bookStatus,
        bookPhoto,
        accountBank,
        accountNumber,
        accountOwner,
        bookIsbn,
        bookTitle,
        bookAuthor,
        bookPublisher,
        bookThumbnail,
        bookListPrice,
        bookPubDate,
        bookSummary,
        bookSearchType,
        bookSearchKeyword
    }
} = PostFormModel;

export default {
    [title.name] : '',
    [bookSearchType.name] : 'name',
    [bookSearchKeyword.name] : '토비의',
    [bookIsbn.name] : '123456',
    [bookTitle.name] : '토비의 스프링',
    [bookAuthor.name] : '토비',
    [bookPublisher.name] : '테스트출판사',
    [bookPubDate.name] : '2019.01.01',
    [bookListPrice.name] : '65000',
    [bookPhoto.name] : [],
    [price.name] : '50000',
    [bookStatus.name] : '',
    [description.name] : ''
};