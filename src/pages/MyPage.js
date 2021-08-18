import {useState} from 'react';
import {styled} from '@material-ui/core/styles';
import {Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, Typography} from '@material-ui/core';
import Page from '../components/Page';
// material
// components
// icons
import FormInitialValues from '../components/register/FormModel/formInitialValues';
import {Close, Edit, EditOff, Save} from '@material-ui/icons'
import {makeStyles} from '@material-ui/styles';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({theme}) => ({
    display: 'flex',
    marginTop: theme.spacing(10),
}));

const SectionStyle = styled(Card)(({theme}) => ({
    width: '100%',
    maxWidth: 800,
    height: 'auto',
    maxHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid black',
    margin: theme.spacing(10, 0, 2, 2),
    padding: theme.spacing(4)
}));

const useStyle = makeStyles((theme) => ({
    cardArea : {
        marginTop: theme.spacing(4)
    }
}));

// ----------------------------------------------------------------------

export default function MyPage() {
    const [isEditable, setIsEditable] = useState(true);
    const classes = useStyle();

    const {
        id,
        memberName,
        phone,
        email,
        bankName,
        accountOwner,
        accountNumber
    } = FormInitialValues;

    return (
        <RootStyle title="회원정보 | Herb Book Store">
            <Grid container justifyContent={'center'}>
                <SectionStyle>
                    <Card className={classes.cardArea}>
                        <CardHeader
                            title={<Typography variant={'h4'}>개인정보</Typography>}
                            subheader={<Typography variant={'body2'}>회원가입 시 입력한 정보를 관리할 수 있습니다.</Typography>}
                            action={
                                <>
                                    <IconButton aria-label={'toggle-edit-mode'}
                                                onClick={() => {
                                                    setIsEditable(!isEditable);
                                                }}
                                    >
                                        {
                                            !isEditable ? <Edit/> : <Close/>
                                        }
                                    </IconButton>
                                    {
                                        isEditable ? (
                                            <IconButton aria-label={'save'}>
                                                <Save/>
                                            </IconButton>
                                        ) : (<></>)
                                    }
                                </>
                            }
                        />
                        <Divider variant={'middle'}/>
                        <CardContent>
                            <Grid container rowGap={2}>
                                <Typography variant={'h6'}>회원정보</Typography>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>아이디 : </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{id}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>이름 : </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{memberName}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>이메일 : </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{email}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>전화번호 : </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{phone}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card className={classes.cardArea}>
                        <CardHeader
                            title={<Typography variant={'h4'}>계좌정보</Typography>}
                            subheader={<Typography variant={'body2'}>등록한 계좌를 관리할 수 있습니다.</Typography>}
                        />
                    </Card>
                    <Card className={classes.cardArea}>
                        <Button
                            fullWidth
                            type={'button'}
                            variant={'contained'}
                            color={'error'}
                        >비밀번호 초기화</Button>
                    </Card>
                </SectionStyle>
            </Grid>
        </RootStyle>
    );
}
