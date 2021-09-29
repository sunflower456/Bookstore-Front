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
        )
    }),
    Yup.object().shape({
        [price.name]: Yup.number()
            .required(`${price.requiredErrorMsg}`)
            .min(1, `${price.invalidErrorMsg}`),
        [description.name]: Yup.string()
            .required(`${description.requiredErrorMsg}`)
            .max(500, `${description.invalidErrorMsg}`),
        [bookStatus.name]: Yup.string().required(
            `${bookStatus.requiredErrorMsg}`
        ),
        [bookPhoto.name]: Yup.array()
            .min(1, "책 사진을 1장 이상 업로드해주세요.")
            .max(5, `${bookPhoto.invalidErrorMsg}`)
    })
];
