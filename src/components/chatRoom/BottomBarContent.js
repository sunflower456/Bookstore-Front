import {
    Card,
    Avatar,
    Tooltip,
    IconButton,
    Box,
    Button,
    Hidden,
    TextField,
    Divider
} from "@material-ui/core";

import { styled } from "@material-ui/core/styles";
import AttachFileTwoToneIcon from "@material-ui/icons/AttachFileTwoTone";
import SendTwoToneIcon from "@material-ui/icons/SendTwoTone";

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

function BottomBarContent() {
    const user = {
        name: "Catherine Pike",
        avatar: "/static/images/avatars/1.jpg"
    };

    return (
        <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <Hidden mdDown>
                <Avatar alt={user.name} src={user.avatar} />
                <DividerWrapper orientation="vertical" flexItem />
            </Hidden>
            <Box sx={{ flex: 1, mr: 2 }}>
                <TextField hiddenLabel fullWidth placeholder="메시지 입력..." />
            </Box>
            <Input accept="image/*" id="messenger-upload-file" type="file" />
            <Tooltip arrow placement="top" title="파일첨부">
                <label htmlFor="messenger-upload-file">
                    <IconButton color="primary" component="span">
                        <AttachFileTwoToneIcon />
                    </IconButton>
                </label>
            </Tooltip>
            <Hidden mdDown>
                <DividerWrapper orientation="vertical" flexItem />
                <Button startIcon={<SendTwoToneIcon />} variant="contained">
                    전송
                </Button>
            </Hidden>
        </Card>
    );
}

export default BottomBarContent;
