import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// material
import { styled } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SidebarContent from "../components/chatRoom/SidebarContent";
import TopBarContent from "../components/chatRoom/TopBarContent";
import ChatContent from "../components/chatRoom/ChatContent";
import BottomBarContent from "../components/chatRoom/BottomBarContent";
import { checkMyInfo } from "../modules/auth";
import { getMyPostChatRoomList } from "../lib/api";
// images

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    display: "flex",
    // minHeight: "100%",
    height: "120vh",
    alignItems: "center"
}));

const Sidebar = styled(Box)(({ theme }) => ({
    width: "300px",
    height: "78vh",
    background: theme.palette.background.paper,
    borderRight: `${theme.palette.grey.A200} solid 1px`
}));

const ChatWindow = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1
}));

const ChatTopBar = styled(Box)(({ theme }) => ({
    background: theme.palette.grey.A200,
    borderBottom: `${theme.palette.grey.A200} solid 1px`,
    padding: theme.spacing(3)
}));

const ChatMain = styled(Box)(() => ({
    flex: 1
}));

const ChatBottomBar = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3)
}));

// const pageStyle = makeStyles((theme) => ({}));

// ----------------------------------------------------------------------

export default function ChatPage() {
    const [chatList, setChatList] = useState([]);
    // const classes = pageStyle();

    const chatArea = useRef();

    // store dispatch 사용
    const dispatch = useDispatch();

    // store에서 내 정보 가져오기
    const { myInfo } = useSelector(({ auth }) => ({
        myInfo: auth.myInfo
    }));

    // myInfo 변경 시 최신화처리 (checkMyInfo)
    // 스크롤 최하단으로 내림
    useEffect(() => {
        dispatch(checkMyInfo()); // 내 정보 확인
        getMyChatList(); // 채팅목록 전체 가져오기
    }, []);

    async function getMyChatList() {
        await getMyPostChatRoomList()
            .then((value) => setChatList(value.data))
            .catch((reason) => {
                console.log(reason);
            });
    }

    return (
        <RootStyle title="채팅방 | 허브 중고 서점">
            <Sidebar>
                <Scrollbar
                    sx={{
                        height: "100%",
                        "& .simplebar-content": {
                            height: "100%",
                            display: "flex",
                            flexDirection: "column"
                        }
                    }}
                >
                    <SidebarContent userInfo={myInfo} chatList={chatList} />
                </Scrollbar>
            </Sidebar>
            <ChatWindow>
                <ChatTopBar>
                    <TopBarContent />
                </ChatTopBar>
                <ChatMain>
                    <Scrollbar ref={chatArea} sx={{ height: "100%" }}>
                        <ChatContent userInfo={myInfo} />
                    </Scrollbar>
                </ChatMain>
            </ChatWindow>
        </RootStyle>
    );
}
