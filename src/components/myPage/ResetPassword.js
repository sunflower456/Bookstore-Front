import {Button, Card, CardHeader, Divider, Typography} from '@material-ui/core';
import {useStyle} from './styles';

export default function ResetPassword() {
    const classes = useStyle();

    return (
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
            >비밀번호 초기화</Button>
        </Card>
    );
}