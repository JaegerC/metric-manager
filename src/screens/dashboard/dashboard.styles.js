import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '30px'
    },
    title: {
        font: 'normal normal normal 26px/36px Open Sans',
        borderBottom: '2px solid #E0E3DA',
        opacity: 1
    },
    bottom_container: {
        display: 'flex',
        justifyContent: 'row',
        paddingTop: '30px'
    },
    botom1: {
        width: '50%',
        paddingRight: '15px'
    },
    botom2: {
        width: '50%',
        paddingLeft: '15px'
    }
}));