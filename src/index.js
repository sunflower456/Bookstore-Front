import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import Cookies from "js-cookie";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import rootReducer, { rootSaga } from "./modules";
import { checkMyInfo, setAccessToken } from "./modules/auth";
import client from "./lib/client";

/* store 및 saga 구성 */
const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleWare))
);

// cookie에서 token 불러오기 처리
function loadUser() {
    try {
        const savedTokenType = Cookies.get("tokenType");
        const savedToken = Cookies.get("accessToken");

        if (!savedToken) {
            return;
        }

        store.dispatch(setAccessToken(savedToken));
        client.defaults.headers.common.Authorization = `${savedTokenType} ${savedToken}`;
        store.dispatch(checkMyInfo());
    } catch (e) {
        console.log(e);
    }
}

// 리덕스 사가 미들웨어 실행
sagaMiddleWare.run(rootSaga);

// cookie에 있는 token 설정
loadUser();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HelmetProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </HelmetProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
