import {makeStyles} from '@material-ui/styles';

export default makeStyles(theme => ({
    stepper: {
        padding: theme.spacing(4),
    },
    buttonArea: {
        display: 'flex',
        justifyContent: 'flex-end',
        verticalAlign: 'middle'
    },
    button: {
        marginLeft: theme.spacing(1),
        borderRadius: theme.spacing(4)
    },
    formArea: {
        width: '100%',
        height: '100%',
        minHeight: '80vh',
        margin: theme.spacing(4, 0),
        padding: theme.spacing(6)
    }
}));