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

// export로 불러오는 경우 정상적으로 동작하지 않음. (Opening Web Socket...)
// /* stomp client 생성 */
// const webSocketSourceUrl = "http://localhost:8081/ws";
// const sockJS = new SockJS(webSocketSourceUrl);
//
// // eslint-disable-next-line prefer-const
// export let stompClient = Stomp.over(sockJS);
// stompClient.debug = (message) => {
//     console.log(message);
// };

export default client;
