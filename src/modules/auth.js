/* action type */
import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";
import client from "../lib/client";

const SET_ACCESS_TOKEN = "auth/SET_ACCESS_TOKEN";
const LOGIN = "auth/LOGIN";

/* action constructor */
export const setAccessToken = createAction(
    SET_ACCESS_TOKEN,
    (accessToken) => accessToken
);
export const login = createAction(LOGIN, ({ identity, password }) => ({
    identity,
    password
}));

/* Asynchronous task */
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

// loginSaga 함수 작성
// 가장 마지막으로 디스패치된 LOGIN 액션을 처리
export function* authSaga() {
    yield takeLatest(LOGIN, loginSaga);
}

/* initial state */
const initialState = {
    accessToken: ""
};

/* reducer functions */
const auth = handleActions(
    {
        [SET_ACCESS_TOKEN]: (state, action) => ({
            ...state,
            accessToken: action.payload
        })
    },
    initialState
);

export default auth;
