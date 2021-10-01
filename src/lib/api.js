import client from "./client";

/* 회원가입 요청 */
export const userSignUp = (identity, password, name, email, phoneNumber) =>
    client.post("http://localhost:8080/api/user/signup", {
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
        "http://localhost:8080/api/user/login",
        {
            identity,
            password
        }
    );

/* 내 정보 조회 */
export const getMyInfo = () => client.get("http://localhost:8080/api/user/me");

/* 내 정보 수정(업데이트) */
export const updateMyInfo = (name, phoneNumber, email) =>
    client.patch("http://localhost:8080/api/user/me", {
        name,
        phoneNumber,
        email
    });

/* 사용자 프로필 업로드 (upload image) */
export const profileUpload = (formData) =>
    client.patch("http://localhost:8080/api/user/profile", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

/* 비밀번호 수정 (초기화) 처리 */
export const modifyPassword = (oldPassword, newPassword) =>
    client.patch("http://localhost:8080/api/user/password", {
        oldPassword,
        newPassword
    });

/* 네이버 책 검색 API 요청 처리 */
export const searchBookInfo = (searchType, searchKeyword) => {
    return client.get(
        `http://localhost:8080/api/post/naverBookAPI?${searchType}=${searchKeyword}&start=1&display=20`
    );
};

/* 판매글 등록 (게시글 등록) 요청 처리 */
export const writePost = (formData) =>
    client.post("http://localhost:8080/api/post", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
