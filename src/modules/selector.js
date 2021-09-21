import { createSelector } from "reselect";

// accessToken 전달 선택자
const getAccessToken = (state) => state.auth.accessToken;

// 사용자정보 전달 선택자
const getMyInfo = (state) => state.auth.myInfo;

// 로그인여부 선택자
export const getAuthorized = createSelector(
    [getAccessToken, getMyInfo],
    (accessToken, myInfo) => accessToken.length > 0 && !!myInfo
);
