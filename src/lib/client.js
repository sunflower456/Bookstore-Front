import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

/* axios 객체 생성 */
const client = axios.create();
// .create({
//     baseURL: 'https://herbBookStore.com/api/',
//     timeout: 1000 * 60 * 5,
//     headers: {'X-Custom-Header': 'foobar'}
// });

/* stomp client 생성 */
const webSocketSourceUrl = "http://localhost:8080/ws";
const sockJS = new SockJS(webSocketSourceUrl);

export const stompClient = Stomp.over(sockJS);
stompClient.debug = (e) => {
    console.log(e);
};

export default client;
