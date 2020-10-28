import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'spece-between',
        padding: '30px'
    },
    title: {
        font: 'normal normal normal 26px/36px Open Sans',
        borderBottom: '2px solid #E0E3DA',
        opacity: 1
    },
    avatar: {
        backgroundColor: '#192D3E',
        width: '150px',
        height: '150px',
        fontSize: '5rem',
        margin: 'auto'
    },
    dataContainer: {
        margin: '15px',
        padding: '15px'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        margin: 'auto'
    },
    inputs: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5%',
        width: '50%',
    },
    input: {
        // margin: theme.spacing(1.5),
        margin: `auto auto 10% auto`,
        background: 'white',
        width: '70%'
    },
}))