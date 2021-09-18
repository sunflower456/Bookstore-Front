import * as Yup from "yup";
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
        bookSummary
    }
} = PostFormModel;

const accountNumEx = /\d{12,14}/gm;

export default [
    Yup.object().shape({
        [title.name]: Yup.string().required(`${title.requiredErrorMsg}`),
        [bookIsbn.name]: Yup.string().required(`${bookIsbn.requiredErrorMsg}`),
        [bookTitle.name]: Yup.string().required(
            `${bookTitle.requiredErrorMsg}`
        ),
        [bookAuthor.name]: Yup.string().required(
            `${bookAuthor.requiredErrorMsg}`
        ),
        [bookPublisher.name]: Yup.string().required(
            `${bookPublisher.requiredErrorMsg}`
        ),
        [bookThumbnail.name]: Yup.string().required(
            `${bookThumbnail.requiredErrorMsg}`
        ),
        [bookListPrice.name]: Yup.string().required(
            `${bookListPrice.requiredErrorMsg}`
        ),
        [bookPubDate.name]: Yup.string().required(
            `${bookPubDate.requiredErrorMsg}`
        ),
        [bookSummary.name]: Yup.string().required(
            `${bookSummary.requiredErrorMsg}`
        )
    }),
    Yup.object().shape({
        [price.name]: Yup.number()
            .required(`${price.requiredErrorMsg}`)
            .min(1, `${price.invalidErrorMsg}`),
        [description.name]: Yup.string().max(
            500,
            `${description.invalidErrorMsg}`
        ),
        [bookStatus.name]: Yup.string().required(
            `${bookStatus.requiredErrorMsg}`
        ),
        [bookPhoto.name]: Yup.array().max(5, `${bookPhoto.invalidErrorMsg}`)
    })
];
