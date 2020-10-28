import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// MUI Elements
import {
    Modal,
    Backdrop,
    Fade,
    ThemeProvider,
    createMuiTheme,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
// Styles
import { useStyles } from './modal.styles';
import { green } from '@material-ui/core/colors';
// Components
import StyledInput from '../styledInput';
import CustomizedSnackbars from '../snack/index';
// Utils
import { EMAIL_REGEX } from '../../constants/utils';
import { userRegistration } from '../../redux/user/actions';

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

export default function RegisterModal(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { data, error, success } = useSelector(state => state.userRegistrationReducer);
    const { departments } = useSelector(state => state.departmentsReducer);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [townId, setTownId] = useState('');
    const [message, setMessage] = useState({});
    const [open_snack, setOpenSnack] = useState(false);
    const [towns, setTowns] = useState([]);

    useEffect(() => {
        if (!success && error) {
            setMessage({
                message: error,
                severity: "error"
            });
            setOpenSnack(true);
        }
        if (success && data && data.id) {
            setMessage({
                message: "Usuario creado exitosamente",
                severity: "success"
            });
            setOpenSnack(true);
            setEmail('');
            setPassword('');
            setUsername('');
            setDepartmentId('');
            setTownId('');
        }

        handleOpen(props.openModal)
    }, [props.openModal, error, success, data])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.setOpenModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage({});

        if (!username || username.trim() === "") {
            setMessage({
                message: "El nombre de usuario no puede quedar vacio",
                severity: "warning"
            });
            return setOpenSnack(true)
        }

        if (!email || email.trim() === "" || !EMAIL_REGEX.test(email)) {
            setMessage({
                message: "Debe de ingresar un correo valido",
                severity: "warning"
            });
            return setOpenSnack(true)
        }

        if (!password || password.trim() === "") {
            setMessage({
                message: "El campo contraseña no puede quedar vacio",
                severity: "warning"
            });
            return setOpenSnack(true)
        }

        if (!townId || isNaN(townId) || townId === 0) {
            setMessage({
                message: "Debe de seleccionar un municipio",
                severity: "warning"
            });
            return setOpenSnack(true)
        }

        const data = {
            username,
            email,
            password,
            townId
        };
        dispatch(userRegistration(data));
    }

    const handleChangeDepto = (e) => {
        setDepartmentId(e.target.value);
        if (e.target.value === 0) {
            setTowns([]);
        } else {
            const aux = departments.find(item => item.id === e.target.value);
            setTowns(aux.towns)
        }
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                disableAutoFocus={false}
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <div style={{ margin: 'auto', paddingTop: '30px' }}>
                                <h3>Registro</h3>
                            </div>
                            <div className={classes.inputContainer}>
                                <ThemeProvider theme={theme}>
                                    <StyledInput
                                        id="mui-theme-provider-outlined-input1"
                                        className={classes.input}
                                        label="Nombre de usuario"
                                        variant="outlined"
                                        name="email"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
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
                                    <FormControl variant="outlined" className={classes.input}>
                                        <InputLabel id="demo-simple-select-outlined-label">Departamento</InputLabel>
                                        <Select
                                            color="primary"
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={departmentId}
                                            onChange={handleChangeDepto}
                                            label="Departamento"
                                        >
                                            <MenuItem value={0}>
                                                <em>Seleccionar</em>
                                            </MenuItem>
                                            {
                                                departments.map(depto => (
                                                    <MenuItem key={depto.id} value={depto.id}>{depto.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="outlined" className={classes.input}>
                                        <InputLabel id="demo-simple-select-outlined-label">Municipio</InputLabel>
                                        <Select
                                            color="primary"
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={townId}
                                            onChange={(e) => setTownId(e.target.value)}
                                            label="Departamento"
                                        >
                                            <MenuItem value={0}>
                                                <em>Seleccionar</em>
                                            </MenuItem>
                                            {
                                                towns.map(t => (
                                                    <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        size="large"
                                        color="primary"
                                        className={classes.button}>Confirmar</Button>
                                </ThemeProvider>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
            {
                open_snack && <CustomizedSnackbars message={message} setOpenSnack={setOpenSnack} open={open_snack} />

            }
        </div>
    );
}