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
    [bookSearchType.name]: "name",
    [bookIsbn.name]: "123456",
    [bookTitle.name]: "토비의 스프링",
    [bookAuthor.name]: "토비",
    [bookPublisher.name]: "테스트출판사",
    [bookPubDate.name]: "2019.01.01",
    [bookListPrice.name]: "65000",
    [bookThumbnail.name]:
        "https://dictionary.cambridge.org/ko/images/thumb/book_noun_001_01679.jpg",
    [bookSummary.name]:
        "뗼뎡킚훔퓻옹곊모뗬f섐왝멙퍁윂쾭됩훀엱뵌톗톋텵님굞댊퐲쮻슍쑹윤쇞킷샍뀢퀤줷셭쌱통벮쀏빛꾨꾲l쯇특퍓땭왻풃젗췃폘먂쏭뙧렝톼끼딞먐볇빡구꺷뎫솰랃낡쮈휊숝릹먅뗞늗줝렳긾꽹쐒츓촊닾켍첾쨟뉔쒺뚺팙볆턣쫠옞촩쌿햩",
    [bookPhoto.name]: [],
    [price.name]: "50000",
    [bookStatus.name]: "",
    [description.name]: ""
};
