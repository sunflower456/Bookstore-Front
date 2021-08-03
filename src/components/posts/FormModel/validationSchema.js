import * as Yup from 'yup';
import PostFormModel from './postFormModel';
import {FixedSizeList} from 'react-window';

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

export default [
    Yup.object().shape({
        [postTitle.name] : Yup.string()
            .max(50, '최대 50자리까지 입력 가능합니다.')
            .required(`${postTitle.requiredErrorMsg}`),
        [bookSearchKeyword.name] : Yup.string()
            .max(2, '최소 3자리이상 입력해야 합니다.')
            .max(50, '최대 50자리까지 입력 가능합니다.')
            .required(`${bookSearchKeyword.requiredErrorMsg}`),
        [bookISBN.name] : Yup.string().required(`${bookISBN.requiredErrorMsg}`),
        [bookTitle.name] : Yup.string().required(`${bookTitle.requiredErrorMsg}`),
        [bookAuthor.name] : Yup.string().required(`${bookAuthor.requiredErrorMsg}`),
        [bookPublisher.name] : Yup.string().required(`${bookPublisher.requiredErrorMsg}`),
        [bookPublishingDate.name] : Yup.string().required(`${bookPublishingDate.requiredErrorMsg}`),
        [bookPrice.name] : Yup.string().required(`${bookPrice.requiredErrorMsg}`)
    })
];