import PostFormModel from "./postFormModel";

const {
    formField: {
        title,
        price,
        description,
        bookStatus,
        bookPhoto,
        bookIsbn,
        bookTitle,
        bookAuthor,
        bookPublisher,
        bookThumbnail,
        bookListPrice,
        bookPubDate,
        bookSummary,
        bookSearchType
    }
} = PostFormModel;

export default {
    [title.name]: "",
    [bookSearchType.name]: "",
    [bookIsbn.name]: "",
    [bookTitle.name]: "",
    [bookAuthor.name]: "",
    [bookPublisher.name]: "",
    [bookPubDate.name]: "",
    [bookListPrice.name]: "",
    [bookThumbnail.name]: "",
    [bookSummary.name]: "",
    [bookPhoto.name]: [],
    [price.name]: "",
    [bookStatus.name]: "",
    [description.name]: ""
};
