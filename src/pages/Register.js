import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import {Box, Card, Link, Container, Typography, Grid} from '@material-ui/core';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import RegisterForm from '../components/register/RegisterForm';
// images
import registerImage from '../static/images/book_joinus.jpg'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    marginTop: theme.spacing(10),
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  height: '80%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(10, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(6, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <RootStyle title="회원가입 | Herb Book Store">
      <Grid container spacing={2}>
        <Grid item md={3}>
          <MHidden width="mdDown">
            <SectionStyle>
              <Typography variant="h3" sx={{ px: 5, mb: 5 }}>
                Herb Book Store에 <br/>
                중고책을 등록해보세요.
              </Typography>
              <img alt="register" src={registerImage} />
              <Typography variant='caption' textAlign='right'>
                Photo by <a href="https://unsplash.com/@youthreee?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">YJ Lee</a> on <a href="https://unsplash.com/s/photos/book-store?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
              </Typography>

            </SectionStyle>
          </MHidden>
        </Grid>
        <Grid item xs={12} md={9}>
          <Container>
            <ContentStyle>
              <Box sx={{ mb: 5 }}>
                <Typography variant="h4" gutterBottom>
                  회원가입
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  찾고 있는 책이 있으시다면 이곳에서 확인해보세요.
                </Typography>
              </Box>

              <RegisterForm />

              <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
                By registering, I agree to Herb Book Store&nbsp;
                <Link underline="always" sx={{ color: 'text.primary' }}>
                  Terms of Service
                </Link>
                &nbsp;and&nbsp;
                <Link underline="always" sx={{ color: 'text.primary' }}>
                  Privacy Policy
                </Link>
                .
              </Typography>
            </ContentStyle>
            <Container sx={{textAlign: 'right', pr: '1em'}}>
              이미 회원이시라면? &nbsp;
              <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
                로그인
              </Link>
            </Container>
          </Container>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
