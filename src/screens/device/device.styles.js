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
    dataContainer: {
        margin: '15px',
        padding: '3%',
        display: 'flex',
        flexDirection: 'column',
    },
    deviceContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: '25px',
        padding: '25px',
        width: '100%'

    },
    deviceTitle: {
        font: 'normal normal normal 20px/30px Open Sans',
        color: '#707070',
        borderBottom: '2px solid #E0E3DA',
        opacity: 1
    },
    deviceSection: {
        width: '50%',
        padding: '10px'
    },
    device: {
        margin: 'auto',
        padding: '50px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    deviceIcon: {
        width: '64px',
        height: '64px',
        margin: 'auto',
        color: '#707070'
    },
    deviceName: {
        width: '60%',
        margin: 'auto',
        color: '#707070'
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
        margin: 'auto'
    },
    labelIcon: {
        color: '#707070',
        opacity: 1
    },
    line: {
        border: '2px solid #E0E3DA',
        opacity: 1
    }
}))