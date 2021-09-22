import client from "./client";

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
