import { useState, ChangeEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Box,
    Typography,
    FormControlLabel,
    Switch,
    Tabs,
    Tab,
    TextField,
    IconButton,
    InputAdornment,
    Avatar,
    List,
    Button,
    Tooltip,
    Divider,
    AvatarGroup,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    lighten
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { CheckTwoTone, AlarmTwoTone } from "@material-ui/icons";
import SettingsTwoToneIcon from "@material-ui/icons/SettingsTwoTone";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import { formatDistance, subMinutes, subHours } from "date-fns";
import Label from "../Label";

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

function SidebarContent() {
    const user = {
        name: "Catherine Pike",
        avatar: "/static/images/avatars/1.jpg",
        jobtitle: "Software Developer"
    };

    const [currentTab, setCurrentTab] = useState("all");

    const tabs = [
        { value: "all", label: "전체" },
        { value: "unread", label: "미확인" }
    ];

    const handleTabsChange = (event, value) => {
        setCurrentTab(value);
    };

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
                                {user.jobtitle}
                            </Typography>
                        </Box>
                        <IconButton sx={{ p: 1 }} size="small" color="primary">
                            <SettingsTwoToneIcon fontSize="small" />
                        </IconButton>
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
                        <ListItemWrapper selected>
                            <ListItemAvatar>
                                <Avatar src="/static/images/avatars/1.jpg" />
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
                                primary="Zain Baptista"
                                secondary="Hey there, how are you today? Is it ok if I call you?"
                            />
                            <Label color="primary">
                                <b>2</b>
                            </Label>
                        </ListItemWrapper>
                        <ListItemWrapper>
                            <ListItemAvatar>
                                <Avatar src="/static/images/avatars/2.jpg" />
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
                                primary="Kierra Herwitz"
                                secondary="Hi! Did you manage to send me those documents"
                            />
                        </ListItemWrapper>
                        <ListItemWrapper>
                            <ListItemAvatar>
                                <Avatar src="/static/images/avatars/1.jpg" />
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
                                primary="Craig Vaccaro"
                                secondary="Ola, I still haven't received the program schedule"
                            />
                        </ListItemWrapper>
                        <ListItemWrapper>
                            <ListItemAvatar>
                                <Avatar src="/static/images/avatars/4.jpg" />
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
                                primary="Adison Press"
                                secondary="I recently did some buying on Amazon and now I'm stuck"
                            />
                            <Label color="primary">
                                <b>8</b>
                            </Label>
                        </ListItemWrapper>
                    </List>
                )}
                {currentTab === "unread" && (
                    <List disablePadding component="div">
                        <ListItemWrapper>
                            <ListItemAvatar>
                                <Avatar src="/static/images/avatars/1.jpg" />
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
                                primary="Zain Baptista"
                                secondary="Hey there, how are you today? Is it ok if I call you?"
                            />
                            <Label color="primary">
                                <b>2</b>
                            </Label>
                        </ListItemWrapper>
                        <ListItemWrapper>
                            <ListItemAvatar>
                                <Avatar src="/static/images/avatars/4.jpg" />
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
                                primary="Adison Press"
                                secondary="I recently did some buying on Amazon and now I'm stuck"
                            />
                            <Label color="primary">
                                <b>8</b>
                            </Label>
                        </ListItemWrapper>
                    </List>
                )}
            </Box>
        </RootWrapper>
    );
}

export default SidebarContent;
