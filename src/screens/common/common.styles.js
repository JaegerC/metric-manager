import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    root: {
        // background: 'white',
        // backgroundImage: 'linear-gradient( 109.6deg,  rgba(44,83,131,1) 18.9%, rgba(95,175,201,1) 91.1% )',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
    },
    sec1: {
        width: '75%',
        overflow: 'hidden'
    },
    background: {
        width: '100%',
        height: '100%',
        objectFit: 'fill',
        // backgroundSize: 'cover',
    },
    sec2: {
        backgroundColor: '#FFFFFF',
        width: '25%'
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
        margin: theme.spacing(1.5),
        background: '#6B8E23',
        color: 'white',
        fontWeight: 'bold'
    },
    text: {
        border: 0,
        padding: 0,
        margin: theme.spacing(1.5),
        textAlign: 'left',
        fontSize: '12px',
        outline: 'none',
        cursor: 'pointer',
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
        cursor: 'pointer',
        backgroundColor: '#FFFFFF',
        color: '#5FA1FC'
    },
    margin: {
        input: theme.spacing(1)
    },
    paper: {
        background: "white",
        width: '30%',
        height: '70%',
        alignContent: 'center',
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '5%'
    }
}));