import { useState } from "react";
import { Warning } from "@material-ui/icons";
import {
    Button,
    Card,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    TextField,
    Typography
} from "@material-ui/core";
import { useStyle } from "./styles";

export default function ResetPassword() {
    const classes = useStyle();
    const [resetFormOpen, setResetFormOpen] = useState(false);

    const handleResetFormOpen = () => setResetFormOpen(true);
    const handleResetFormClose = () => setResetFormOpen(false);

    return (
        <>
            <Card className={classes.cardArea}>
                <CardHeader
                    title={
                        <Typography variant={"h4"}>비밀번호 재설정</Typography>
                    }
                    subheader={
                        <Typography variant={"body2"}>
                            새로운 비밀번호로 설정할 수 있습니다. (* 이전
                            비밀번호로 복원할 수 없습니다.)
                        </Typography>
                    }
                />
                <Divider variant={"middle"} />
                <Button
                    fullWidth
                    type={"button"}
                    sx={{ marginTop: "1em" }}
                    variant={"text"}
                    color={"error"}
                    onClick={handleResetFormOpen}
                >
                    비밀번호 변경
                </Button>
            </Card>
            <div>
                <Dialog
                    open={resetFormOpen}
                    aria-labelledby="reset-password-dialog-title"
                    aria-describedby="reset-password-dialog-form"
                >
                    <DialogTitle id="reset-password-dialog-title">
                        비밀번호 초기화
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="reset-password-dialog-form">
                            <TextField
                                fullWidth
                                sx={{ margin: "1em 0" }}
                                name={"currentPass"}
                                label={"현재 비밀번호"}
                                type={"password"}
                            />
                            <TextField
                                fullWidth
                                name={"pass"}
                                label={"비밀번호"}
                                type={"password"}
                            />
                            <TextField
                                fullWidth
                                name={"passCheck"}
                                label={"비밀번호 확인"}
                                type={"password"}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleResetFormClose}
                            color={"inherit"}
                        >
                            취소
                        </Button>
                        <Button onClick={handleResetFormClose} autoFocus>
                            초기화
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}