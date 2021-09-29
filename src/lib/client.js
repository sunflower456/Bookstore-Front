import axios from "axios";

// axios 객체 생성
const client = axios.create();
// .create({
//     baseURL: "http://localhost:8080",
//     timeout: 1000 * 60 * 5,
//     headers: { "X-Custom-Header": "foobar" }
// });

export default client;
