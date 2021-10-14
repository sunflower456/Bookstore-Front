import {
    Box,
    Avatar,
    Typography,
    Card,
    Divider,
    Hidden,
    TextField,
    Button
} from "@material-ui/core";

import { styled } from "@material-ui/core/styles";
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
import { HourglassEmpty, TextsmsTwoTone } from "@material-ui/icons";
import ScheduleTwoToneIcon from "@material-ui/icons/ScheduleTwoTone";
import { stompClient } from "../../lib/client";

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

function ChatContent(props) {
    const { userInfo } = props;
    const [message, setMessage] = useState(""); // 작성된 메시지
    const [contents, setContents] = useState([]); // subscribe로 전달받는 메시지 포함 content

    const inputMessageBox = useRef();
    // store 상태 조회
    const { chatRoom } = useSelector(({ chat }) => ({
        chatRoom: chat.chatRoom
    }));

    const chatUser = {
        name: "",
        avatar: ""
    };

    if (userInfo != null) {
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

    const onMessageReceive = (data) => {
        const newMessage = JSON.parse(data.body);

        addMessage(newMessage);
    };

    const handleInputEnter = (event) => {
        if (event.keyCode === 13) {
            // enter 입력 시
            handleEnter();
        }
    };

    const handleEnter = () => {
        if (chatRoom != null) {
            const messageQuery = {
                roomId: chatRoom.roomId,
                senderId: 1,
                senderIdentity: userInfo.identity,
                content: message
            };

            stompClient.send(
                "/pub/chat/message",
                {},
                JSON.stringify(messageQuery)
            );
            setMessage("");
            inputMessageBox.current.value = "";
        }
    };

    const addMessage = (inputMessage) => {
        setContents((prev) => [...prev, inputMessage]);
    };

    useEffect(() => {
        if (chatRoom != null) {
            const destination = `/sub/chat/room/${chatRoom.roomId}`;

            stompClient.subscribe(destination, onMessageReceive);
        }
    }, [chatRoom, contents]);

    return chatRoom == null ? (
        <Box pb={3} sx={{ height: "78vh" }}>
            <Divider sx={{ mb: 3 }} />
            <AvatarSuccess>
                <TextsmsTwoTone />
            </AvatarSuccess>
            <Typography sx={{ mt: 2, textAlign: "center" }} variant="subtitle2">
                채팅방 목록에서 접속할 채팅방을 선택해주세요.
            </Typography>
            <Divider sx={{ mt: 3 }} />
        </Box>
    ) : (
        <>
            {contents.map((messageContent, index) => (
                <p key={index}>{messageContent.content}</p>
            ))}
            <DividerWrapper>
                {format(subDays(new Date(), 3), "yyyy.MM.dd", {
                    locale: ko
                })}
            </DividerWrapper>
            <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
                py={3}
            >
                <Avatar
                    variant="rounded"
                    sx={{ width: 50, height: 50 }}
                    alt="Zain Baptista"
                    src="/static/images/avatars/2.jpg"
                />
                <Box
                    display="flex"
                    alignItems="flex-start"
                    flexDirection="column"
                    justifyContent="flex-start"
                    ml={2}
                >
                    <CardWrapperSecondary>
                        Hi. Can you send me the missing invoices asap?
                    </CardWrapperSecondary>
                    <Typography
                        variant="subtitle1"
                        sx={{ pt: 1, display: "flex", alignItems: "center" }}
                    >
                        <ScheduleTwoToneIcon
                            sx={{ mr: 0.5 }}
                            fontSize="small"
                        />
                        {formatDistance(subHours(new Date(), 115), new Date(), {
                            addSuffix: true,
                            locale: ko
                        })}
                    </Typography>
                </Box>
            </Box>
            <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-end"
                py={3}
            >
                <Box
                    display="flex"
                    alignItems="flex-end"
                    flexDirection="column"
                    justifyContent="flex-end"
                    mr={2}
                >
                    <CardWrapperPrimary>
                        Yes, I&#39;ll email them right now. I&#39;ll let you
                        know once the remaining invoices are done.
                    </CardWrapperPrimary>
                    <Typography
                        variant="subtitle1"
                        sx={{ pt: 1, display: "flex", alignItems: "center" }}
                    >
                        <ScheduleTwoToneIcon
                            sx={{ mr: 0.5 }}
                            fontSize="small"
                        />
                        {formatDistance(subHours(new Date(), 125), new Date(), {
                            addSuffix: true,
                            locale: ko
                        })}
                    </Typography>
                </Box>
                <Avatar
                    variant="rounded"
                    sx={{ width: 50, height: 50 }}
                    alt={opponentUser.name}
                    src={opponentUser.avatar}
                />
            </Box>
            <DividerWrapper>
                {format(subDays(new Date(), 5), "yyyy.MM.dd", {
                    locale: ko
                })}
            </DividerWrapper>
            <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-end"
                py={3}
            >
                <Box
                    display="flex"
                    alignItems="flex-end"
                    flexDirection="column"
                    justifyContent="flex-end"
                    mr={2}
                >
                    <CardWrapperPrimary>Hey! Are you there?</CardWrapperPrimary>
                    <CardWrapperPrimary sx={{ mt: 2 }}>
                        Heeeelloooo????
                    </CardWrapperPrimary>
                    <Typography
                        variant="subtitle1"
                        sx={{ pt: 1, display: "flex", alignItems: "center" }}
                    >
                        <ScheduleTwoToneIcon
                            sx={{ mr: 0.5 }}
                            fontSize="small"
                        />
                        {formatDistance(subHours(new Date(), 60), new Date(), {
                            addSuffix: true,
                            locale: ko
                        })}
                    </Typography>
                </Box>
                <Avatar
                    variant="rounded"
                    sx={{ width: 50, height: 50 }}
                    alt={opponentUser.name}
                    src={opponentUser.avatar}
                />
            </Box>
            <DividerWrapper>오늘</DividerWrapper>
            <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
                py={3}
            >
                <Avatar
                    variant="rounded"
                    sx={{ width: 50, height: 50 }}
                    alt="Zain Baptista"
                    src="/static/images/avatars/2.jpg"
                />
                <Box
                    display="flex"
                    alignItems="flex-start"
                    flexDirection="column"
                    justifyContent="flex-start"
                    ml={2}
                >
                    <CardWrapperSecondary>Hey there!</CardWrapperSecondary>
                    <CardWrapperSecondary sx={{ mt: 1 }}>
                        How are you? Is it ok if I call you?
                    </CardWrapperSecondary>
                    <Typography
                        variant="subtitle1"
                        sx={{ pt: 1, display: "flex", alignItems: "center" }}
                    >
                        <ScheduleTwoToneIcon
                            sx={{ mr: 0.5 }}
                            fontSize="small"
                        />
                        {formatDistance(subMinutes(new Date(), 6), new Date(), {
                            addSuffix: true,
                            locale: ko
                        })}
                    </Typography>
                </Box>
            </Box>
            <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-end"
                py={3}
            >
                <Box
                    display="flex"
                    alignItems="flex-end"
                    flexDirection="column"
                    justifyContent="flex-end"
                    mr={2}
                >
                    <CardWrapperPrimary>
                        Hello, I just got my Amazon order shipped and I’m very
                        happy about that.
                    </CardWrapperPrimary>
                    <CardWrapperPrimary sx={{ mt: 1 }}>
                        Can you confirm?
                    </CardWrapperPrimary>
                    <Typography
                        variant="subtitle1"
                        sx={{ pt: 1, display: "flex", alignItems: "center" }}
                    >
                        <ScheduleTwoToneIcon
                            sx={{ mr: 0.5 }}
                            fontSize="small"
                        />
                        {formatDistance(subMinutes(new Date(), 8), new Date(), {
                            addSuffix: true,
                            locale: ko
                        })}
                    </Typography>
                </Box>
                <Avatar
                    variant="rounded"
                    sx={{ width: 50, height: 50 }}
                    alt={opponentUser.name}
                    src={opponentUser.avatar}
                />
            </Box>
            <ChatBottomBar>
                <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    <Hidden mdDown>
                        <Avatar alt={chatUser.name} src={chatUser.avatar} />
                        <DividerWrapper orientation="vertical" flexItem />
                    </Hidden>
                    <Box sx={{ flex: 1, mr: 2 }}>
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
                    >
                        전송
                    </Button>
                </Card>
            </ChatBottomBar>
        </>
    );
}

export default ChatContent;
