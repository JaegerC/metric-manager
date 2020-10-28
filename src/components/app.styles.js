import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    navigator: {
        display: 'flex',
        flexDirection: 'row',
        right: 0,
        position: 'fixed',
        overflow: 'hidden',
        maxWidth: '100%',
        backgroundColor: 'rgb(0, 136, 204)',
        padding: '0 20px',
        borderRadius: '0 0 0 40px',
        boxShadow: '0 10px 40px rgba(159, 162, 177, .8)',
        zIndex: 1
    },
    navigatorMin: {
        display: 'flex',
        flexDirection: 'row',
        right: 0,
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '100%',
        backgroundColor: 'rgb(0, 136, 204)',
        padding: '0 20px',
        borderRadius: '0 0 0 40px',
        boxShadow: '0 10px 40px rgba(159, 162, 177, .8)',
        zIndex: 1
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        padding: "1rem",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: "9999",
        opacity: 1,
        overflowX: "auto",
        overflowY: "auto",
    },
    smallModal: {
        overflowX: "auto",
        overflowY: "auto",
        display: 'flex',
        // padding: '10%',  // height
    },
}));