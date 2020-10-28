import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        width: '600px',
        borderRadius: '25px'
    },
    form: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: ''
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '366px',
        height: '60%',
        margin: 'auto',
        padding: '5%',
        background: 'white'
    },
    input: {
        margin: theme.spacing(1.5),
        background: 'white',
    },
    button: {
        margin: '50px auto 50px auto',
        background: '#6B8E23',
        color: 'white',
        fontWeight: 'bold',
        width: '150px'
    },
    text: {
        border: 0,
        padding: 0,
        margin: theme.spacing(1.5),
        textAlign: 'left',
        fontSize: '12px',
        outline: 'none',
        textDecoration: 'none',
        backgroundColor: '#FFFFFF',
        color: '#5FA1FC'
    },
    register: {
        border: 0,
        padding: 0,
        margin: theme.spacing(1),
        textAlign: 'center',
        fontSize: '14px',
        outline: 'none',
        textDecoration: 'none',
        backgroundColor: '#FFFFFF',
        color: '#5FA1FC'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
    }
}));