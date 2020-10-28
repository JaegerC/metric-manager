import React, { useState, useEffect } from 'react';
// MUI Components
import { createMuiTheme, ThemeProvider, Button } from '@material-ui/core';
// Styles
import { useStyles } from './common.styles';
import { green } from '@material-ui/core/colors';
import nature from '../../assets/pexels-alejandro-barrón-96715(1).jpg';
// Utils
import { routes } from '../../setup/routes';
import { useDispatch, useSelector } from 'react-redux';
// Componentes
import RegisterModal from '../../components/modal/index';
import StyledInput from '../../components/styledInput';
import CustomizedSnackbars from '../../components/snack/index';
// Actions
import { login } from '../../redux/user/actions';
import { getDepartments } from '../../redux/common/action';

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});
const Main = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [open_snack, setOpenSnack] = useState(false);
    const [message, setMessage] = useState({});
    const { error, token, success } = useSelector(state => state.loginUserReducer)
    useEffect(() => {
        dispatch(getDepartments());
        if (!success && error) {
            setMessage({
                message: error,
                severity: "error"
            });
            setOpenSnack(true)
        }

        if (success && token && token.trim() !== "") {
            setEmail("");
            setPassword("");
            setMessage({});
            return props.history.push(routes.main)
        }
    }, [dispatch, error, success, token, props.history])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || email.trim("") === "") {
            setMessage({
                message: "Por favor ingrese su correo",
                severity: "warning"
            });
            return setOpenSnack(true);
        }

        if (!password || password.trim() === "") {
            setMessage({
                message: "Por favor ingrese su contraseña",
                severity: "warning"
            });
            return setOpenSnack(true);
        }

        dispatch(login({ email, password }));
    }

    const openRegisterModal = () => {
        setOpenModal(true)
    }

    return (
        <>
            <div className={classes.root}>
                <section className={classes.sec1}>
                    <img className={classes.background} src={nature} alt="" />
                </section>
                <section className={classes.sec2}>

                    <form className={classes.form} onSubmit={handleSubmit}>
                        <div style={{ margin: 'auto' }}>
                            <h3>Sistema de control de metricas</h3>
                        </div>
                        <div className={classes.inputContainer}>
                            <ThemeProvider theme={theme}>
                                <StyledInput
                                    id="mui-theme-provider-outlined-input1"
                                    className={classes.input}
                                    label="Correo"
                                    variant="outlined"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <StyledInput
                                    id="mui-theme-provider-outlined-input2"
                                    className={classes.input}
                                    label="Contraseña"
                                    variant="outlined"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="button" className={classes.text}>
                                    ¿Olvidaste tu contraseña?
                            </button>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    size="large"
                                    color="primary"
                                    className={classes.button}>Ingresar</Button>
                                <button type="button" className={classes.register} onClick={openRegisterModal} >
                                    Registrarse
                            </button>
                            </ThemeProvider>
                        </div>
                    </form>
                </section>
            </div>
            {openModal && <RegisterModal openModal={openModal} setOpenModal={setOpenModal} />}
            {open_snack && <CustomizedSnackbars message={message} setOpenSnack={setOpenSnack} open={open_snack} />}
        </>
    );
};

export default Main;