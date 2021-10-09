import React, { useEffect, useRef } from "react";
// material
import { styled } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SidebarContent from "../components/chatRoom/SidebarContent";
import TopBarContent from "../components/chatRoom/TopBarContent";
import ChatContent from "../components/chatRoom/ChatContent";
import BottomBarContent from "../components/chatRoom/BottomBarContent";
// images

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    display: "flex",
    minHeight: "100%",
    alignItems: "center"
}));

const Sidebar = styled(Box)(({ theme }) => ({
    width: "300px",
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
    background: theme.palette.grey["100"],
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
    // const classes = pageStyle();

    const chatArea = useRef();

    useEffect(() => {
        if (chatArea.current) {
            chatArea.current.scrollTop = chatArea.current.scrollHeight;
        }
    });

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
                    <SidebarContent />
                </Scrollbar>
            </Sidebar>
            <ChatWindow>
                <ChatTopBar>
                    <TopBarContent />
                </ChatTopBar>
                <ChatMain>
                    <Scrollbar ref={chatArea}>
                        <ChatContent />
                    </Scrollbar>
                </ChatMain>
                <ChatBottomBar>
                    <BottomBarContent />
                </ChatBottomBar>
            </ChatWindow>
        </RootStyle>
    );
}
