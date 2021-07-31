import {Link as RouterLink} from 'react-router-dom';
// material
import {styled} from '@material-ui/core/styles';
import {Card, Container, Grid, Link, Typography} from '@material-ui/core';
// components
import Page from '../components/Page';
import {default as LoginPage} from '../components/login/Login'
import {MHidden} from '../components/@material-extend';
// images
import bookImage from '../static/images/book_sales.jpg';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
        marginTop: theme.spacing(10),
    }
}));

const SectionStyle = styled(Card)(({theme}) => ({
    width: '100%',
    maxWidth: 464,
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '80vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(6, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
    return (
        <RootStyle title="Login | Herb Book Store">
            <Grid container spacing={2}>
                <Grid item md={9}>
                    &nbsp;
                </Grid>
                <Grid item md={3} xs={12} sx={{textAlign: 'right', pr: '1em'}}>
                    회원이 아니시라면?
                    <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
                        &nbsp; 회원가입
                    </Link>
                </Grid>
                <Grid item md={3}>
                    <MHidden width="mdDown">
                        <SectionStyle>
                            <Typography variant="h3" sx={{px: 5, mt: 10, mb: 5}}>
                                원하는 중고책? <br/> Herb Book Store!
                            </Typography>
                            <img
                                src={bookImage}
                                alt={'책장에 책이 가득한 사진 - by freddie marriage on Unsplash'}
                            />
                        </SectionStyle>
                    </MHidden>
                </Grid>
                <Grid item md={9} xs={12}>
                    <ContentStyle>

                        <LoginPage/>
                    </ContentStyle>
                </Grid>
            </Grid>
        </RootStyle>
    );
}
