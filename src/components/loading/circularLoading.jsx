import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        background: 'rgba(255,255,255,0.3)',
    },
    loading: {
        color: 'rgb(0, 136, 204)'
    }
}));

const CircularLoading = ({ isLoading }) => {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={isLoading}>
            <CircularProgress
                disableShrink
                className={classes.loading}
                size={80}
                thickness={2}
            />
        </Backdrop>
    );
}

export default CircularLoading;