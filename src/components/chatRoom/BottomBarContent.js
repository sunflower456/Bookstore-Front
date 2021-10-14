import { useState } from "react";
import { useSelector } from "react-redux";
import {
    Avatar,
    Box,
    Button,
    Card,
    Divider,
    Hidden,
    TextField
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import SendTwoToneIcon from "@material-ui/icons/SendTwoTone";
import { stompClient } from "../../lib/client";

const DividerWrapper = styled(Divider)(
    ({ theme }) => `
        height: 40px !important;
        margin: 0 ${theme.spacing(2)};
        align-self: center;
`
);

const Input = styled("input")({
    display: "none"
});

function BottomBarContent(props) {
    const { userInfo } = props;
    const [message, setMessage] = useState("");

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
        }
    };

    return (
        <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <Hidden mdDown>
                <Avatar alt={chatUser.name} src={chatUser.avatar} />
                <DividerWrapper orientation="vertical" flexItem />
            </Hidden>
            <Box sx={{ flex: 1, mr: 2 }}>
                <TextField
                    hiddenLabel
                    fullWidth
                    placeholder="메시지 입력..."
                    onChange={(event) => setMessage(event.target.value)}
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
    );
}

export default BottomBarContent;
