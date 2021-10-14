import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./auth";
import chat, { chatSaga } from "./chat";

/* 루트 리듀서와 루트 사가를 모아둔 파일 */

/* root reducer */
const rootReducer = combineReducers({
    auth,
    chat
});

/* root saga */
export function* rootSaga() {
    yield all([authSaga(), chatSaga()]);
}

export default rootReducer;
