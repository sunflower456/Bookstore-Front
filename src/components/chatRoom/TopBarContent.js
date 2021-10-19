import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    Box,
    IconButton,
    Tooltip,
    Typography
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { ExitToApp } from "@material-ui/icons";
import * as api from "../../lib/api";
import { setTargetChatRoom } from "../../modules/chat";

const RootWrapper = styled(Box)(
    ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`
);

function TopBarContent() {
    // store dispatch 사용
    const dispatch = useDispatch();

    // store 상태 조회
    const { chatRoom } = useSelector(({ chat }) => ({
        chatRoom: chat.chatRoom
    }));

    const user =
        chatRoom == null
            ? {
                  name: "상대 유저 ID",
                  avatar: ""
              }
            : {
                  name: chatRoom.opponentIdentity,
                  avatar: chatRoom.opponentProfile
              };

    const handleExitChatRoom = () => {
        if (chatRoom != null) {
            api.setLeaveChatRoom(chatRoom.roomId)
                .then(() => {
                    window.location.reload();
                    dispatch(setTargetChatRoom(null));
                })
                .catch((error) =>
                    console.log(`채팅방 삭제(나가기) 실패 : ${error}`)
                );
        } else {
            console.log("채팅방 나가기 실패 : 채팅방 정보 없음");
        }
    };

    return (
        <>
            <RootWrapper>
                <Box sx={{ display: { sm: "flex" } }} alignItems="center">
                    <Avatar
                        variant="rounded"
                        sx={{ width: 50, height: 50 }}
                        alt={user.name}
                        src={user.avatar}
                    />
                    <Box sx={{ pl: { sm: 1.5 }, pt: { xs: 1.5, sm: 0 } }}>
                        <Typography variant="h4" gutterBottom>
                            {chatRoom == null ? "판매글" : chatRoom.postTitle}
                        </Typography>
                        <Typography variant="subtitle2">{user.name}</Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        mt: { xs: 3, md: 0 }
                    }}
                >
                    {!!chatRoom && (
                        <Tooltip placement="bottom" title="채팅방 나가기">
                            <IconButton
                                color="primary"
                                onClick={() => handleExitChatRoom()}
                            >
                                <ExitToApp />
                            </IconButton>
                        </Tooltip>
                    )}

                    {/* <Tooltip placement="bottom" title="부가정보">*/}
                    {/*    <IconButton color="primary">*/}
                    {/*        <InfoTwoToneIcon />*/}
                    {/*    </IconButton>*/}
                    {/* </Tooltip>*/}
                </Box>
            </RootWrapper>
        </>
    );
}

export default TopBarContent;
