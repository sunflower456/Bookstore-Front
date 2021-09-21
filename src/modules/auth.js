/* action type */
import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";
import client from "../lib/client";

/* actions */
// 로그인 관련
const SET_ACCESS_TOKEN = "auth/SET_ACCESS_TOKEN";
const LOGIN = "auth/LOGIN";
// 사용자 정보 관
const SET_MY_INFO = "auth/SET_MY_INFO";
const CHECK_MY_INFO = "auth/CHECK_MY_INFO";

/* action constructor */
// token 세팅
export const setAccessToken = createAction(
    SET_ACCESS_TOKEN,
    (accessToken) => accessToken
);
// 로그인 요청
export const login = createAction(LOGIN, ({ identity, password }) => ({
    identity,
    password
}));
// 사용자정보 설정
export const setMyInfo = createAction(SET_MY_INFO, (myInfo) => myInfo);
export const checkMyInfo = createAction(CHECK_MY_INFO);

/* Asynchronous task */
// 로그인 처리
function* loginSaga(action) {
    try {
        const { identity, password } = action.payload;
        const response = yield call(api.login, identity, password);
        const { accessToken, tokenType } = response.data;

        const authToken = `${tokenType} ${accessToken}`;

        console.log(`token 확인 : ${authToken}`);

        yield put(setAccessToken(accessToken));

        client.defaults.headers.common.Authorization = authToken;
    } catch (e) {
        console.log(`loginSaga 에러 : ${e}`);
        yield put(setAccessToken(new Error(`loginSaga 에러 : ${e}`)));
    }
}

// 내 정보 조회
function* checkMyInfoSaga() {
    try {
        const response = yield call(api.getMyInfo);

        console.log(`내 정보 확인 - ID : ${response.data.identity}`);

        yield put(setMyInfo(response.data));
    } catch (e) {
        console.log(`checkMyInfoSaga 에러 : ${e}`);
    }
}

// authSaga 함수 작성
export function* authSaga() {
    yield takeLatest(LOGIN, loginSaga); // 가장 마지막으로 디스패치된 LOGIN 액션을 처리
    yield takeLatest(CHECK_MY_INFO, checkMyInfoSaga); // 가장 마지막으로 디스패치된 checkMyInfo 액션을 처리
}

/* initial state */
const initialState = {
    accessToken: "", // JWT
    myInfo: null // 로그인한 사용자 정보
};

/* reducer functions */
const auth = handleActions(
    {
        [SET_ACCESS_TOKEN]: (state, action) => ({
            ...state,
            accessToken: action.payload
        }),
        [SET_MY_INFO]: (state, action) => ({
            ...state,
            myInfo: action.payload
        })
    },
    initialState
);

export default auth;
