import client, { chatClient } from "./client";

/* 회원가입 요청 */
export const userSignUp = (identity, password, name, email, phoneNumber) =>
    client.post("/api/user/signup", {
        identity,
        password,
        name,
        email,
        phoneNumber
    });

/* 로그인 요청 */
export const login = (identity, password) =>
    client.post(
        // `localhost:8080/api/user/login?identity=${identity}&password=${password}`
        "/api/user/login",
        {
            identity,
            password
        }
    );

/* 내 정보 조회 */
export const getMyInfo = () => client.get("/api/user/me");

/* 내 정보 수정(업데이트) */
export const updateMyInfo = (name, phoneNumber, email) =>
    client.patch("/api/user/me", {
        name,
        phoneNumber,
        email
    });

/* 사용자 프로필 업로드 (upload image) */
export const profileUpload = (formData) =>
    client.patch("/api/user/profile", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

/* 사용자 프로필 삭제 (delete image) */
export const profileDelete = () => client.delete("/api/user/profile");

/* 비밀번호 수정 (초기화) 처리 */
export const modifyPassword = (oldPassword, newPassword) =>
    client.patch("/api/user/password", {
        oldPassword,
        newPassword
    });

/* 네이버 책 검색 API 요청 처리 */
export const searchBookInfo = (searchType, searchKeyword, display, start) => {
    return client.get(
        `/api/post/naverBookAPI?${searchType}=${searchKeyword}&display=${display}&start=${start}`
    );
};

/* 판매글 등록 (게시글 등록) 요청 처리 */
export const writePost = (formData) =>
    client.post("/api/post", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

/* 내 관심목록 조회 기능 */
export const getMyFavoritePosts = () => client.get("/api/user/me/interests");

/* 내 관심목록 삭제 (선택한 아이템 하나씩 삭제) */
export const deleteMyFavoritePost = (interestId) =>
    client.delete(`/api/user/me/interest/${interestId}`);

/* 내 판매글 조회 기능 */
export const getMySalePosts = () => client.get("/api/user/me/post");

/* 채팅방 목록 조회 */
export const getMyPostChatRoomList = () => client.get("/api/room");

/* 채팅방 삭제(나가기) 처리 */
export const setLeaveChatRoom = (roomId) =>
    client.delete(`/api/room/${roomId}`);

/* 대상 채팅방의 이전 메시지 조회 */
export const getBeforeChats = (roomId, page, size) => {
    const targetPage = page == null ? 0 : page;
    const targetSize = size == null ? 50 : size;

    return client.get(
        `/api/message/${roomId}?page=${targetPage}&size=${targetSize}`
    );
};
/* 전체 판매글 조회 기능 */
export const getAllPosts = (paramSize, paramPage) =>
    client.get(
        `/api/post?size=${encodeURIComponent(
            paramSize
        )}&page=${encodeURIComponent(paramPage)}`
    );

/* 전체 판매글 title로 조회 기능 */
export const getAllPostsByTitle = (paramSize, title) => {
    return client.get(
        `/api/post?title=${encodeURIComponent(title)}&size=${paramSize}&page=0`
    );
};

/* 전체 판매글 저자로 조회 기능 */
export const getAllPostsByAuthor = (paramSize, author) => {
    return client.get(
        `/api/post?author=${encodeURIComponent(
            author
        )}&size=${paramSize}&page=0`
    );
};

/* 전체 판매글 출판사로 조회 기능 */
export const getAllPostsByPublisher = (paramSize, publisher) => {
    return client.get(
        `/api/post?publisher=${encodeURIComponent(
            publisher
        )}&size=${paramSize}&page=0`
    );
};

/* 게시글 수정 기능  */
export const postUpdate = (id, formData) =>
    client.patch(`/api/post/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

/* 게시글 상세 조회 기능 */
export const getDetailPost = (id) => {
    return client.get(`/api/post/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
};

/* 관심 목록 추가 기능 */
export const addMyFavoritePost = (id) =>
    client.post("/api/user/me/interest", JSON.stringify({ postId: id }), {
        headers: {
            "Content-Type": "application/json"
        }
    });

/* 게시글 상태 변경 기능 */
export const editPostStatus = (postId, postStatus) =>
    client.patch(`/api/post/postStatus/${postId}`, {
        postStatus
    });

/* 채팅방 개설 기능  */
export const openChat = (postId, sellerId) =>
    client.post("/api/room", {
        postId,
        sellerId
    });
