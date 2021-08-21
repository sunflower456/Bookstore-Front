import {
    Button,
    Card,
    CardHeader,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider, Icon, TextField,
    Typography
} from '@material-ui/core';
import {useStyle} from './styles';
import {useState} from 'react';
import {Warning} from '@material-ui/icons';
import {InputField} from '../common/FormFields';

export default function ResetPassword() {
    const classes = useStyle();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [resetFormOpen, setResetFormOpen] = useState(false);

    const onClickOpen = () => setDialogOpen(true);
    const onClickClose = () => setDialogOpen(false);
    const onClickCloseAndOpenReset = () => {
        setDialogOpen(false);
        setResetFormOpen(true);
    };
    const handleResetFormOpen = () => setResetFormOpen(true);
    const handleResetFormClose = () => setResetFormOpen(false);


    return (
        <>
            <Card className={classes.cardArea}>
                <CardHeader
                    title={<Typography variant={'h4'}>비밀번호 재설정</Typography>}
                    subheader={<Typography variant={'body2'}>초기화 후 새로운 비밀번호로 설정할 수 있습니다.</Typography>}
                />
                <Divider variant={'middle'}/>
                <Button
                    fullWidth
                    type={'button'}
                    variant={'contained'}
                    color={'error'}
                    onClick={onClickOpen}
                >비밀번호 초기화</Button>
            </Card>
            <div>
                <Dialog
                    open={dialogOpen}
                    onClose={onClickClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <Warning/> 비밀번호 초기화 경고
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            비밀번호 재설정을 위해 현재 설정된 비밀번호를 초기화합니다.
                            초기화 이전으로 되돌릴 수 없습니다. 계속 진행하시겠습니까?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClickClose} color={'inherit'}>취소</Button>
                        <Button onClick={onClickCloseAndOpenReset} autoFocus color={'error'}>
                            초기화
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
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
                                name={'pass'}
                                label={'비밀번호'}
                                type={'password'}
                            />
                            <TextField
                                fullWidth
                                name={'passCheck'}
                                label={'비밀번호 확인'}
                                type={'password'}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleResetFormClose} color={'inherit'}>취소</Button>
                        <Button onClick={handleResetFormClose} autoFocus>
                            초기화
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}