import {
    Box,
    Avatar,
    Typography,
    Card,
    Divider,
    Hidden,
    TextField,
    Button,
    List
} from "@material-ui/core";

import { styled } from "@material-ui/core/styles";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {
    formatDistance,
    format,
    subDays,
    subHours,
    subMinutes
} from "date-fns";
import { ko } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import SendTwoToneIcon from "@material-ui/icons/SendTwoTone";
import ScheduleTwoToneIcon from "@material-ui/icons/ScheduleTwoTone";
import { HourglassEmpty, TextsmsTwoTone } from "@material-ui/icons";
import * as api from "../../lib/api";
import Scrollbar from "../Scrollbar";

const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
          color: ${theme.palette.success.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
          margin-left: auto;
          margin-right: auto;
    `
);

const DividerWrapper = styled(Divider)(
    ({ theme }) => `
      .MuiDivider-wrapper {
        text-transform: none;
        background: ${theme.palette.background.default};
        font-size: ${theme.typography.pxToRem(13)};
        color: ${theme.palette.grey[800]};
      }
`
);

const CardWrapperPrimary = styled(Card)(
    ({ theme }) => `
      background: ${theme.palette.primary.main};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(2)};
      border-radius: 2em;
      border-top-right-radius: 1em;
      max-width: 380px;
      display: inline-flex;
`
);

const CardWrapperSecondary = styled(Card)(
    ({ theme }) => `
      background: ${theme.palette.secondary.main};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(2)};
      border-radius: 2em;
      border-top-left-radius: 1em;
      max-width: 380px;
      display: inline-flex;
`
);

const ChatBottomBar = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3)
}));

// eslint-disable-next-line prefer-const
let stompClient = null;

function ChatContent(props) {
    const { userInfo } = props;
    const [message, setMessage] = useState(""); // 작성된 메시지
    const [contents, setContents] = useState([]); // subscribe로 전달받는 메시지 포함 content
    const [isMyMessageEntered, setIsMyMessageEntered] = useState(false);

    const inputMessageBox = useRef();
    const messageArea = useRef();
    // store 상태 조회
    const { chatRoom } = useSelector(({ chat }) => ({
        chatRoom: chat.chatRoom
    }));

    const chatUser = {
        id: "",
        name: "",
        avatar: ""
    };

    if (userInfo != null) {
        chatUser.id = userInfo.userId;
        chatUser.name = userInfo.name;
        chatUser.avatar = userInfo.profileImage;
    }

    const opponentUser =
        chatRoom == null
            ? {
                  name: "상대 유저 ID",
                  avatar: ""
              }
            : {
                  name: chatRoom.opponentIdentity,
                  avatar: chatRoom.opponentProfile
              };

    const onMessageReceive = (payload) => {
        const newMessage = JSON.parse(payload.body);

        addMessage(newMessage);
    };

    const handleInputEnter = (event) => {
        if (event.keyCode === 13) {
            // enter 입력 시 전송 처리
            handleEnter();
        }
    };

    const handleEnter = () => {
        if (chatRoom != null) {
            const messageQuery = {
                roomId: chatRoom.roomId,
                senderId: chatUser.id,
                senderIdentity: userInfo.identity,
                content: message
            };

            stompClient.send(
                "/pub/chat/message",
                {},
                JSON.stringify(messageQuery)
            );
            setMessage("");
            inputMessageBox.current.value = ""; // 입력영역 초기화
            setIsMyMessageEntered(true); // 내 메시지 입력 시 스크롤 하단 이동용
        }
    };

    const addMessage = (inputMessage) => {
        setContents((prev) => [...prev, inputMessage]);
    };

    const onConnected = () => {
        const destination = `/sub/chat/room/${chatRoom.roomId}`;

        stompClient.subscribe(destination, onMessageReceive);
        console.log("접속!");
    };

    // 이전 메시지 가져오기 및 최초 설정
    const getBeforeChatContents = async (page, size) => {
        const targetPage = page == null ? 0 : page;
        const targetSize = size == null ? 50 : size;

        await api
            .getBeforeChats(chatRoom.roomId, targetPage, targetSize)
            .then((response) => {
                const chatData = response.data;

                setContents([...chatData].reverse()); // 가장 최근 데이터가 index 0이므로 배열을 거꾸로 처리
            })
            .catch((reason) =>
                console.log(`이전 메시지 불러오기 에러 : ${reason}`)
            );
    };

    useEffect(() => {
        if (chatRoom != null) {
            if (stompClient == null) {
                /* stomp client 생성 */
                const webSocketSourceUrl = "http://localhost:8081/ws";
                const sockJS = new SockJS(webSocketSourceUrl);

                stompClient = Stomp.over(sockJS);

                stompClient.heartbeat.outgoing = 20000;
                stompClient.heartbeat.incoming = 0;
                stompClient.reconnect_delay = 3000;
                stompClient.debug((debugMessage) => {
                    console.log(`stompMessage : ${debugMessage}`);
                });

                setIsMyMessageEntered(true); // 최초 스크롤 최하단 설정용
            }
            // console.log(`접속 상태 : ${stompClient.connected}`);

            if (!stompClient.connected) {
                // 최초 접속 시 이전 메시지 가져오기
                getBeforeChatContents();
                // 접속과 구독 설정
                stompClient.connect({}, onConnected);
            }

            if (isMyMessageEntered) {
                messageArea.current.scrollTop =
                    messageArea.current.scrollHeight; // 스크롤 최하단으로 이동
                setIsMyMessageEntered(false); // 초기화
            }
        }
    }, [chatRoom, contents]);

    const renderOpponentChat = (messageContent, index) => {
        return (
            <Box
                key={`${messageContent.senderId}_${index}`}
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
                py={3}
                pl={2}
            >
                <Avatar
                    variant="rounded"
                    sx={{ width: 50, height: 50 }}
                    alt={messageContent.senderIdentity}
                    src={opponentUser.avatar}
                />
                <Box
                    display="flex"
                    alignItems="flex-start"
                    flexDirection="column"
                    justifyContent="flex-start"
                    ml={2}
                >
                    <CardWrapperSecondary>
                        {messageContent.content}
                    </CardWrapperSecondary>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            pt: 1,
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <ScheduleTwoToneIcon
                            sx={{ mr: 0.5 }}
                            fontSize="small"
                        />
                        {messageContent.createdDate == null
                            ? "알수없음"
                            : formatDistance(
                                  new Date(messageContent.createdDate),
                                  new Date(),
                                  {
                                      includeSeconds: true,
                                      addSuffix: true,
                                      locale: ko
                                  }
                              )}
                    </Typography>
                </Box>
            </Box>
        );
    };

    const renderMyChat = (messageContent, index) => {
        return (
            <Box
                key={`${messageContent.senderId}_${index}`}
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-end"
                py={3}
                pr={2}
            >
                <Box
                    display="flex"
                    alignItems="flex-end"
                    flexDirection="column"
                    justifyContent="flex-end"
                    mr={2}
                >
                    <CardWrapperPrimary>
                        {messageContent.content}
                    </CardWrapperPrimary>
                    <Typography
                        variant="subtitle1"
                        sx={{ pt: 1, display: "flex", alignItems: "center" }}
                    >
                        <ScheduleTwoToneIcon
                            sx={{ mr: 0.5 }}
                            fontSize="small"
                        />
                        {messageContent.createdDate == null
                            ? "알수없음"
                            : formatDistance(
                                  new Date(messageContent.createdDate),
                                  new Date(),
                                  {
                                      includeSeconds: true,
                                      addSuffix: true,
                                      locale: ko
                                  }
                              )}
                    </Typography>
                </Box>
                <Avatar
                    variant="rounded"
                    sx={{ width: 50, height: 50 }}
                    alt={messageContent.senderIdentity}
                    src={chatUser.avatar}
                />
            </Box>
        );
    };

    return chatRoom == null ? (
        <Box pb={3} sx={{ height: "80vh" }}>
            <Divider sx={{ mb: 3 }} />
            <AvatarSuccess>
                <TextsmsTwoTone />
            </AvatarSuccess>
            <Typography sx={{ mt: 2, textAlign: "center" }} variant="subtitle2">
                채팅목록에서 접속할 채팅방을 선택해주세요.
            </Typography>
            <Divider sx={{ mt: 3 }} />
        </Box>
    ) : (
        <>
            <List
                ref={messageArea}
                sx={{
                    width: "100%",
                    height: "78vh",
                    maxHeight: "80%",
                    position: "relative",
                    overflow: "auto"
                }}
            >
                {contents.map((messageContent, index) => {
                    const isMyChat = messageContent.senderId === chatUser.id;

                    return isMyChat
                        ? renderMyChat(messageContent, index)
                        : renderOpponentChat(messageContent, index);
                })}
            </List>
            <ChatBottomBar>
                <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    <Hidden mdDown>
                        <Avatar
                            alt={chatUser.name}
                            src={chatUser.avatar}
                            sx={{ mr: 1 }}
                        />
                        <DividerWrapper orientation="vertical" flexItem />
                    </Hidden>
                    <Box sx={{ flex: 1, ml: 2, mr: 2 }}>
                        <TextField
                            inputRef={inputMessageBox}
                            hiddenLabel
                            fullWidth
                            placeholder="메시지 입력..."
                            onChange={(event) => setMessage(event.target.value)}
                            onKeyDown={handleInputEnter}
                        />
                    </Box>
                    <DividerWrapper orientation="vertical" flexItem />
                    <Button
                        startIcon={<SendTwoToneIcon />}
                        variant="contained"
                        onClick={handleEnter}
                        sx={{ ml: 1 }}
                    >
                        전송
                    </Button>
                </Card>
            </ChatBottomBar>
        </>
    );
}

export default ChatContent;
