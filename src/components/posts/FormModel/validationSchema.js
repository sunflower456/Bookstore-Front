import * as Yup from "yup";
import PostFormModel from "./postFormModel";

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
        bookSearchKeyword
    }
} = PostFormModel;

const accountNumEx = /\d{12,14}/gm;

export default [
    Yup.object().shape({
        [title.name]: Yup.string().required(`${title.requiredErrorMsg}`),
        [bookSearchKeyword.name]: Yup.string()
            .min(1, "최소 2자리이상 입력해야 합니다.")
            .max(50, "최대 50자리까지 입력 가능합니다.")
            .required(`${bookSearchKeyword.requiredErrorMsg}`),
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
        [bookPhoto.name]: Yup.array().max(5, `${bookPhoto.invalidErrorMsg}`),
        [accountBank.name]: Yup.string().required(
            `${accountBank.requiredErrorMsg}`
        ),
        [accountOwner.name]: Yup.string().required(
            `${accountOwner.requiredErrorMsg}`
        ),
        [accountNumber.name]: Yup.string()
            .required(`${accountNumber.requiredErrorMsg}`)
            .matches(accountNumEx, `${accountNumber.invalidErrorMsg}`)
            .max(14, "최대 14자리까지 입력 가능합니다.")
            .test(
                "numberLengthCheck",
                `${accountNumber.invalidErrorMsg}`,
                (inputAccountNumber) => {
                    const length =
                        inputAccountNumber == null
                            ? 0
                            : inputAccountNumber.length;

                    return length >= 12 && length <= 14;
                }
            )
    })
];
