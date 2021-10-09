import axios from "axios";

// axios 객체 생성
const client = axios.create();
// .create({
//     baseURL: 'https://herbBookStore.com/api/',
//     timeout: 1000 * 60 * 5,
//     headers: {'X-Custom-Header': 'foobar'}
// });

export default client;
