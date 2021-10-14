import { useEffect } from "react";

import {
    AccordionSummary,
    Avatar,
    Box,
    IconButton,
    ListItemIcon,
    Tooltip,
    Typography
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { ExitToApp } from "@material-ui/icons";
import { formatDistance, subMinutes } from "date-fns";
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone";
import { connect, useDispatch, useSelector } from "react-redux";
import { getAuthorized } from "../../modules/selector";

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
    useEffect(() => {}, []);

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
                            {chatRoom == null ? "글제목" : chatRoom.postTitle}
                        </Typography>
                        <Typography variant="subtitle2">{user.name}</Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        mt: { xs: 3, md: 0 }
                    }}
                >
                    <Tooltip placement="bottom" title="채팅방 나가기">
                        <IconButton color="primary">
                            <ExitToApp />
                        </IconButton>
                    </Tooltip>
                    <Tooltip placement="bottom" title="부가정보">
                        <IconButton color="primary">
                            <InfoTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </RootWrapper>
        </>
    );
}

export default TopBarContent;
