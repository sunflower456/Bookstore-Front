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
