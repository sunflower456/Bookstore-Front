import { styled } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Typography, Card } from "@material-ui/core";
import Page from "../components/Page";
import "./ImagesSlide.scss";
import DetailTable from "../components/detail/DetailTable";
import DetailTableEdit from "../components/detail/DetailTableEdit";
import DetailTableEmpty from "../components/detail/DetailTableEmpty";

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

    const [image, setImage] = useState();

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
            setDetail(<DetailTable product={product} />);
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
            setEditPostStatus(value);
        }
    };

    // store 상태 조회
    const { accessToken, myInfo } = useSelector(({ auth }) => ({
        accessToken: auth.accessToken,
        myInfo: auth.myInfo
    }));

    const updateState = (payload) => {
        return new Promise((resolve) => {
            setProduct({
                product: payload
            });
        });
    };

    const myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");

    const myHeaders2 = new Headers();

    myHeaders2.append("Authorization", `Bearer ${accessToken}`);
    // myHeaders2.append("Content-Type", "multipart/form-data");

    const onChangeImageFile = (e) => {
        setImage(e[0]);
    };

    const deleteImages = (no) => {
        temp = temp.concat(curImages[no]);
        setDelImages(temp);
    };

    // post 수정
    const editDetailPost = async () => {
        console.log("delImages : ", delImages);
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
        formData.append("images", image);

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }
        const data = await fetch(`http://localhost:8080/api/post/${id}`, {
            method: "PATCH",
            headers: myHeaders2,
            body: formData
        });
    };

    const fetchDetailData = async () => {
        const data = await fetch(`http://localhost:8080/api/post/${id}`, {
            method: "GET",
            headers: myHeaders
        }).then((response) => response.json());

        if (data) {
            await updateState(data);
            return data;
        }

        return product;
    };

    const editInterest = async () => {
        if (isInterest) {
            // 관심목록에서 삭제하기

            const data = await fetch(
                "http://localhost:8080/api/user/me/interests",
                {
                    method: "GET",
                    headers: myHeaders
                }
            )
                .then((response) => response.json())
                .then((response) => {
                    response.filter(
                        (item) => item.postsResponse.postId === `${id}`
                    );
                    console.log(response);
                    if (response[0].interestId) {
                        fetch(
                            `http://localhost:8080/api/user/me/interest/${response[0].interestId}`,
                            {
                                method: "DELETE",
                                headers: myHeaders
                            }
                        );
                    }
                });

            await setIsInterest(false);
            await setInterestTage("관심목록 추가");

            return data;
        } else {
            // 관심목록에 추가하기

            const data = await fetch(
                "http://localhost:8080/api/user/me/interest",
                {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify({ postId: `${id}` })
                }
            );

            await setIsInterest(true);
            await setInterestTage("관심목록 삭제");

            return data;
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
            setEditBookStatus(product.product.postStatus);
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
