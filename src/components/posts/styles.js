import {makeStyles} from '@material-ui/styles';
import palette from '../../theme/palette';

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
    postTitle: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2)
    },
    formArea: {
        width: '100%',
        height: '100%',
        minHeight: '80vh',
        margin: theme.spacing(2, 0, 4),
        padding: theme.spacing(6)
    }
}));