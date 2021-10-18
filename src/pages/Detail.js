import { styled } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Button, ButtonGroup, Typography, Card } from "@material-ui/core";
import Page from "../components/Page";
import "./ImagesSlide.scss";
import DetailTable from "../components/detail/DetailTable";
import DetailTableEdit from "../components/detail/DetailTableEdit";
import DetailTableEmpty from "../components/detail/DetailTableEmpty";
import * as api from "../lib/api";

// ----------------------------------------------------------------------

const SectionStyle = styled(Card)(({ theme }) => ({
    width: "100%",
    maxWidth: 900,
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "1px solid black",
    margin: theme.spacing(10, 0, 2, 2),
    padding: theme.spacing(4)
}));

export default function ProductDetail() {
    const [detail, setDetail] = useState(<DetailTableEmpty />);
    const [detailFlag, setDetailFlag] = useState("read");
    const [btnLabel, setBtnLabel] = useState("수정하기");
    const [product, setProduct] = useState();
    const { id } = useParams();
    const [editTitle, setEditTitle] = useState();
    const [editBookListPrice, setEditBookListPrice] = useState();
    const [editBookStatus, setEditBookStatus] = useState();
    const [editDescription, setEditDescription] = useState();
    const [editPostStatus, setEditPostStatus] = useState();
    const [isInterest, setIsInterest] = useState();
    const [interestTag, setInterestTage] = useState();
    const [images, setImages] = useState([]);
    const [curImages, setCurImages] = useState();
    const [delImages, setDelImages] = useState([]);
    const formData = new FormData();
    let temp = [];
    const onEditClick = () => {
        if (detailFlag === "read") {
            setDetailFlag("edit");
            setDetail(
                <DetailTableEdit
                    product={product}
                    onChangeEdit={onChangeEdit}
                    onChangeImageFile={onChangeImageFile}
                    deleteImages={deleteImages}
                />
            );
            setBtnLabel("저장하기");
        } else {
            setDetailFlag("read");
            setBtnLabel("수정하기");
            editDetailPost();
            alert("수정 완료!");
        }
    };

    const onChangeEdit = (name, value) => {
        console.log(name, value);
        if (name === "title") {
            setEditTitle(value);
        } else if (name === "bookListPrice") {
            setEditBookListPrice(value);
        } else if (name === "bookStatus") {
            if (value === "최상") {
                setEditBookStatus("BEST");
            } else if (value === "상") {
                setEditBookStatus("UPPER");
            } else if (value === "중") {
                setEditBookStatus("MIDDLE");
            } else {
                setEditBookStatus("LOWER");
            }
        } else if (name === "description") {
            setEditDescription(value);
        } else if (name === "postStatus") {
            if (value === "판매 중") {
                setEditPostStatus("SALE");
            } else if (value === "예약 중") {
                setEditPostStatus("RESERVED");
            } else if (value === "판매 완료") {
                setEditPostStatus("SOLD_OUT");
            }
        }
    };

    const updateState = (payload) => {
        return new Promise((resolve) => {
            setProduct({
                product: payload
            });
        });
    };

    const onChangeImageFile = (e) => {
        setImages(e);
    };

    const deleteImages = (no) => {
        temp = temp.concat(curImages[no]);
        setDelImages(temp);
    };

    // post 수정
    const editDetailPost = async () => {
        const postUpdateRequest = {
            title: editTitle,
            price: editBookListPrice,
            description: editDescription,
            bookStatus: editBookStatus,
            deleteImgUrls: delImages
        };

        formData.append(
            "postUpdateRequest",
            new Blob([JSON.stringify(postUpdateRequest)], {
                type: "application/json"
            })
        );
        images.forEach((file) => formData.append("images", file));

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }

        try {
            await api.postUpdate(id, formData).catch((err) => {
                if (err.response == null) {
                    alert(err.message);
                } else {
                    console.log(err.response.message);
                }
            });
            await api.editPostStatus(id, editPostStatus).catch((err) => {
                if (err.response == null) {
                    alert(err.message);
                } else {
                    console.log(err.response.message);
                }
            });
            fetchDetailData();
            await setDetail(<DetailTable product={product} />);
            await setDelImages([]);
            await setImages([]);
        } catch (e) {
            if (e.response == null) {
                alert(e.message);
            } else {
                console.log(e.response.message);
            }
        }
    };

    const fetchDetailData = async () => {
        try {
            await api
                .getDetailPost(id)
                .then((response) => updateState(response.data))
                .catch((err) => {
                    if (err.response == null) {
                        alert(err.message);
                    } else {
                        console.log(err.response.message);
                    }
                });
        } catch (e) {
            if (e.response == null) {
                alert(e.message);
            } else {
                console.log(e.response.message);
            }
        }
    };

    const editInterest = async () => {
        if (isInterest) {
            // 관심목록에서 삭제하기

            try {
                await api
                    .getMyFavoritePosts()
                    .then((response) => {
                        response.data.filter(
                            (item) => item.postsResponse.postId === `${id}`
                        );
                        if (response.data[0].interestId) {
                            api.deleteMyFavoritePost(
                                response.data[0].interestId
                            );
                        }
                    })
                    .catch((err) => {
                        if (err.response == null) {
                            alert(err.message);
                        } else {
                            console.log(err.response.message);
                        }
                    });

                await setIsInterest(false);
                await setInterestTage("관심목록 추가");
            } catch (e) {
                if (e.response == null) {
                    alert(e.message);
                } else {
                    console.log(e.response.message);
                }
            }
        } else {
            // 관심목록에 추가하기

            try {
                await api.addMyFavoritePost(id).catch((err) => {
                    if (err.response == null) {
                        alert(err.message);
                    } else {
                        console.log(err.response.message);
                    }
                });

                await setIsInterest(true);
                await setInterestTage("관심목록 삭제");
            } catch (e) {
                if (e.response == null) {
                    alert(e.message);
                } else {
                    console.log(e.response.message);
                }
            }
        }
    };

    useEffect(() => {
        if (product === null || product === undefined) {
            fetchDetailData();
        }

        if (product) {
            setDetail(<DetailTable product={product} />);
            setEditTitle(product.product.title);
            setEditBookListPrice(product.product.price);
            if (product.product.bookStatus === "상") {
                setEditBookStatus("UPPER");
            } else if (product.product.bookStatus === "중") {
                setEditBookStatus("MIDDLE");
            } else if (product.product.bookStatus === "하") {
                setEditBookStatus("LOWER");
            } else if (product.product.bookStatus === "최상") {
                setEditBookStatus("BEST");
            }
            setEditDescription(product.product.description);

            if (product.product.images.length !== 0) {
                setCurImages(product.product.images);
            }
            if (product.product.myInterest === false) {
                setIsInterest(false);
                setInterestTage("관심목록 추가");
            } else {
                setIsInterest(true);
                setInterestTage("관심목록 삭제");
            }
        }
    }, [product]);

    return (
        <Page title="허브중고서점">
            <Typography variant="h2" sx={{ mb: 15 }}>
                허브 중고 서점
            </Typography>
            <Button
                size="large"
                variant="contained"
                style={{ float: "right", marginRight: "120px" }}
                onClick={onEditClick}
            >
                {btnLabel}
            </Button>
            <br />
            <SectionStyle>{detail}</SectionStyle>
            <br />
            <br />
            <ButtonGroup variant="contained" color="primary">
                <Button size="large">채팅하기</Button>
                <Button size="large" onClick={editInterest}>
                    {interestTag}
                </Button>
            </ButtonGroup>
        </Page>
    );
}
