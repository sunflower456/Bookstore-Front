import {Button, Container, Typography} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import useStyles from './styles';

export default function Welcome() {
    const classes = useStyles();

    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                회원이 되신 것을 환영합니다!
            </Typography>
            <Typography variant="subtitle1">
                로그인 후 저희 서비스를 이용하실 수 있습니다.
            </Typography>
            <Button className={classes.backButton} to="/" size="large" variant="contained" component={RouterLink}>
                홈화면으로
            </Button>
        </Container>
    );
}