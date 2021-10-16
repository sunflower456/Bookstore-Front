/* action type */
import { createAction, handleActions } from "redux-actions";
import { put, takeLatest } from "redux-saga/effects";

/* actions */
// 접속할 채팅방 id 설정
const SET_TARGET_CHATROOM = "chat/SET_TARGET_CHATROOM";
const CHECK_TARGET_CHATROOM = "chat/CHECK_TARGET_CHATROOM";

/* action constructor */
// 채팅방 id 세팅
export const setTargetChatRoom = createAction(
    SET_TARGET_CHATROOM,
    (chatRoom) => chatRoom
);
// 채팅방 id 확인
// export const checkTargetChatRoomId = createAction(CHECK_TARGET_CHATROOM);

/* Asynchronous task */

// 채팅방 목록에서 선택한 채팅방 설정
function* checkTargetChatRoomSaga(action) {
    try {
        const selectedRoom = action.payload == null ? "" : action.payload;

        yield put(setTargetChatRoom(selectedRoom));
    } catch (e) {
        console.log(`checkMyInfoSaga 에러 : ${e}`);
    }
}

// authSaga 함수 작성
export function* chatSaga() {
    yield takeLatest(CHECK_TARGET_CHATROOM, checkTargetChatRoomSaga); // 가장 마지막으로 디스패치된 checkMyInfo 액션을 처리
}

/* initial state */
const initialState = {
    chatRoom: null // 선택한 채팅방 정보
};

/* reducer functions */
const chat = handleActions(
    {
        [SET_TARGET_CHATROOM]: (state, action) => ({
            ...state,
            chatRoom: action.payload
        })
    },
    initialState
);

export default chat;
