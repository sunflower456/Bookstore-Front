import client from "./client";

export const userSignUp = (identity, password, name, email, phoneNumber) =>
    client.post("/api/user/signup", {
        identity,
        password,
        name,
        email,
        phoneNumber
    });
