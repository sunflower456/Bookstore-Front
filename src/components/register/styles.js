import {makeStyles} from '@material-ui/styles'

export default makeStyles(theme => ({
    wrapper: {
        position: 'relative',
        marginTop: theme.spacing(2)
    },
    stepper: {
        paddingBottom: theme.spacing(5)
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
    buttonProgress: {
        position: 'absolute',
        top: '40%',
        left: '50%'
    }
}));