import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Avatar,
    Box,
    InputAdornment,
    lighten,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import Label from "../Label";
import { setTargetChatRoomId } from "../../modules/chat";
import { stompClient } from "../../lib/client";

const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
          background-color: ${theme.palette.success.light};
          color: ${theme.palette.success.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
          margin-left: auto;
          margin-right: auto;
    `
);

const MeetingBox = styled(Box)(
    ({ theme }) => `
          background-color: ${lighten(theme.palette.grey[800], 0.5)};
          margin: ${theme.spacing(2)} 0;
          border-radius: 1em;
          padding: ${theme.spacing(2)};
    `
);

const RootWrapper = styled(Box)(
    ({ theme }) => `
        width: auto;
        height: 140vh;
        padding: ${theme.spacing(2.5)};
  `
);

const ListItemWrapper = styled(ListItemButton)(
    ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `
);

const TabsContainerWrapper = styled(Box)(
    ({ theme }) => `
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            border: 0;
        }

        .MuiTab-root {
            &.MuiButtonBase-root {
                padding: 0;
                margin-right: ${theme.spacing(3)};
                font-size: ${theme.typography.pxToRem(16)};
                color: ${theme.palette.grey[700]};

                .MuiTouchRipple-root {
                    display: none;
                }
            }

            &.Mui-selected:hover,
            &.Mui-selected {
                color: ${theme.palette.grey[800]};
            }
        }
  `
);

function SidebarContent(prop) {
    const [currentTab, setCurrentTab] = useState("all");
    const [currentChatRoom, setCurrentChatRoom] = useState(null);
    const { userInfo, chatList } = prop;

    // store dispatch 사용
    const dispatch = useDispatch();

    // store 상태 조회
    const { chatRoom } = useSelector(({ chat }) => ({
        chatRoom: chat.chatRoom
    }));

    let name = "";
    let avatar = "";
    let email = "";

    if (userInfo != null) {
        name = userInfo.name;
        avatar = userInfo.profileImage;
        email = userInfo.email;
    }

    const user = {
        name,
        avatar,
        email
    };

    const tabs = [
        { value: "all", label: "전체" },
        { value: "sales", label: "판매글" },
        { value: "purchases", label: "구매요청" }
    ];

    const handleTabsChange = (event, value) => {
        setCurrentTab(value);
    };

    const onClickChatRoom = (roomInfo) => {
        if (roomInfo == null) {
            throw new Error("채팅방 정보가 확인되지 않음.");
        }

        const selectedChatRoom = {
            roomId: roomInfo.roomId,
            postTitle: roomInfo.postTitle,
            opponentIdentity: roomInfo.opponentIdentity,
            opponentProfile: roomInfo.opponentProfile,
            opponentLeave: roomInfo.opponentLeave
        };

        try {
            setCurrentChatRoom(selectedChatRoom);
            dispatch(setTargetChatRoomId(selectedChatRoom));
        } catch (e) {
            console.log(`채팅방 선택 오류: ${e}`);
        }
    };

    useEffect(() => {
        stompClient.connect(
            {},
            (connect) => {
                if (chatRoom != null) {
                    const destination = `/sub/chat/room/${chatRoom.roomId}`;

                    stompClient.subscribe(destination, (message) => {
                        console.log(message);
                    });
                }

                console.log(`STOMP 접속 : ${connect}`);
            },
            (error) => {
                console.log(`STOMP 접속 오류 : ${error}`);
            }
        );
    }, [currentChatRoom]);

    return (
        <RootWrapper>
            <Box display="flex" alignItems="flex-start">
                <Avatar alt={user.name} src={user.avatar} />
                <Box sx={{ ml: 1.5, flex: 1 }}>
                    <Box
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="space-between"
                    >
                        <Box>
                            <Typography variant="h5" noWrap>
                                {user.name}
                            </Typography>
                            <Typography variant="subtitle1" noWrap>
                                {user.email}
                            </Typography>
                        </Box>
                        {/* <IconButton sx={{ p: 1 }} size="small" color="primary">*/}
                        {/*    <SettingsTwoToneIcon fontSize="small" />*/}
                        {/* </IconButton>*/}
                    </Box>
                </Box>
            </Box>

            <TextField
                sx={{ mt: 2, mb: 1 }}
                size="small"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchTwoToneIcon />
                        </InputAdornment>
                    )
                }}
                placeholder="ID 검색..."
            />

            <Typography sx={{ mb: 1, mt: 2 }} variant="h3">
                채팅목록
            </Typography>

            <TabsContainerWrapper>
                <Tabs
                    onChange={handleTabsChange}
                    value={currentTab}
                    variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary"
                >
                    {tabs.map((tab) => (
                        <Tab
                            key={tab.value}
                            label={tab.label}
                            value={tab.value}
                        />
                    ))}
                </Tabs>
            </TabsContainerWrapper>

            <Box mt={2}>
                {currentTab === "all" && (
                    <List disablePadding component="div">
                        {chatList.map((value, index) => (
                            <ListItemWrapper
                                key={value.roomId}
                                onClick={() => onClickChatRoom(value)}
                            >
                                <ListItemAvatar>
                                    <Avatar src={value.postBookThumbnail} />
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{ mr: 1 }}
                                    primaryTypographyProps={{
                                        color: "textPrimary",
                                        variant: "h5",
                                        noWrap: true
                                    }}
                                    secondaryTypographyProps={{
                                        color: "textSecondary",
                                        noWrap: true
                                    }}
                                    primary={value.postTitle}
                                    secondary={`${value.opponentIdentity} 님과의 채팅방`}
                                />
                                <Label color="primary">
                                    <b>2</b>
                                </Label>
                            </ListItemWrapper>
                        ))}
                    </List>
                )}
                {currentTab === "sales"}
                {currentTab === "purchases" && (
                    <List disablePadding component="div">
                        {chatList
                            .filter((value) => value.opponentIdentity === name)
                            .map((value, index) => (
                                <ListItemWrapper
                                    key={value.roomId}
                                    onClick={() => onClickChatRoom(value)}
                                >
                                    <ListItemAvatar>
                                        <Avatar src={value.postBookThumbnail} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{ mr: 1 }}
                                        primaryTypographyProps={{
                                            color: "textPrimary",
                                            variant: "h5",
                                            noWrap: true
                                        }}
                                        secondaryTypographyProps={{
                                            color: "textSecondary",
                                            noWrap: true
                                        }}
                                        primary={value.postTitle}
                                        secondary={`${value.opponentIdentity} 님과의 채팅방`}
                                    />
                                    <Label color="primary">
                                        <b>2</b>
                                    </Label>
                                </ListItemWrapper>
                            ))}
                    </List>
                )}
            </Box>
        </RootWrapper>
    );
}

export default SidebarContent;
