import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Button } from '@material-ui/core';
import { logout } from '../../redux/user/actions';
const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const AuthLoading = ({ message, openModal, history, userId }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        setOpen(openModal);
    }, [setOpen, openModal])

    const handleClose = () => {
        setOpen(false);
    };

    const callBackLogout = () => {
        dispatch(logout({ userId }));
        window.location.replace('/');
        // return history.replace('/');
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                disableScrollLock={true}
                disableBackdropClick={true}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">{message}</h2>
                        <p id="transition-modal-description">Presiona el boton para continuar.</p>
                        <Button onClick={(e) => callBackLogout(e)} variant="contained" color="primary" disableElevation ><span>Continuar</span></Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
export default AuthLoading;
