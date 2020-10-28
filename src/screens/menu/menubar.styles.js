import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        }
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            backgroundColor: '#6B8E23'
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#6B8E23'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    linkStyle: {
        display: 'flex',
        textDecoration: 'none',
        color: 'black',
        justifyContent: 'center'
    },
}));