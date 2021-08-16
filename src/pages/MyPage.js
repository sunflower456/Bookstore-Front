// material
import {styled} from '@material-ui/core/styles';
import {Card, CardContent, CardHeader, Divider, Grid, IconButton, Typography} from '@material-ui/core';
// components
import Page from '../components/Page';
// icons
import {Edit} from '@material-ui/icons'

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

// ----------------------------------------------------------------------

export default function MyPage() {
    return (
        <RootStyle title="회원정보 | Herb Book Store">
            <Grid container justifyContent={'center'}>
                <SectionStyle>
                    <Card>
                        <CardHeader
                            title={<Typography variant={'h4'}>개인정보</Typography>}
                            subheader={<Typography variant={'body2'}>회원가입 시 입력한 정보를 관리할 수 있습니다.</Typography>}
                            action={
                                <IconButton aria-label={'edit'}>
                                    <Edit/>
                                    <Typography variant={'subtitle1'}>수정</Typography>
                                </IconButton>
                            }
                        />
                        <Divider variant={'middle'}/>
                        <CardContent>
                            여기에 내용이 담김.
                        </CardContent>
                    </Card>
                </SectionStyle>
            </Grid>
        </RootStyle>
    );
}
