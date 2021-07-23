import React from 'react';
import {Avatar, Box, Button, Container, CssBaseline, makeStyles, TextField, Typography} from '@material-ui/core';
import {VpnKeyRounded, CreateRounded} from '@material-ui/icons'
import HerbLogo from '../../static/images/herbLogo.png';
import Copyright from '../copyright/Copyright';

const useStyles = makeStyles((theme) => ({
    centerBox: {
        margin: theme.spacing(10, 2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    title: {
        marginTop: theme.spacing(2),
    },
    submitButton: {
        margin: theme.spacing(3, 0),
    },
    joinButton: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#388E3C',
        },
    }
}));

function Login() {
    const classes = useStyles();

    return (
        <Container component={'main'} maxWidth={'xs'}>
            <CssBaseline/>
            <div className={classes.centerBox}>
                <Avatar className={classes.large} alt={'herbBookStore'} src={HerbLogo}/>
                <Typography className={classes.title} component={'h1'} variant={'h4'}>
                    Herb-Bookstore
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant='outlined'
                        required
                        fullWidth
                        margin='dense'
                        color='primary'
                        id='id'
                        label='ID'
                        type='text'
                        name='idField'
                        placeholder='아이디를 입력하세요.'
                        autoFocus
                    />
                    <TextField
                        variant='outlined'
                        required
                        fullWidth
                        margin='dense'
                        color='primary'
                        id='pw'
                        label='Password'
                        type='password'
                        name='passwordField'
                        placeholder='비밀번호를 입력하세요.'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submitButton}
                        startIcon={<VpnKeyRounded/>}
                    >
                        로그인
                    </Button>
                    <Button
                        type={'button'}
                        className={classes.joinButton}
                        fullWidth
                        variant={'contained'}
                        startIcon={<CreateRounded/>}
                    >
                        회원가입
                    </Button>
                </form>
            </div>
            <Copyright/>
        </Container>
    );
}

export default Login;