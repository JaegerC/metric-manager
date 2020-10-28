import React from 'react';
import { Paper, Avatar, createMuiTheme, ThemeProvider, Typography } from '@material-ui/core';
import { useStyles } from './user.styles';
import { green } from '@material-ui/core/colors';
import StyledInput from '../../components/styledInput';
import { useSelector } from 'react-redux';
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});
const User = () => {
    const classes = useStyles();
    const { user } = useSelector(state => state.auth);

    return (
        <>
            <Paper elevation={10} className={classes.paper}>
                <div className={classes.title}>Usuario</div>
                <div className={classes.dataContainer}>
                    <Avatar className={classes.avatar} >{user && user.username ? user.username[0] : 'U'}</Avatar>
                    {
                        user && Object.keys(user).length > 0 ?
                            <div className={classes.inputContainer}>
                                <div className={classes.inputs}>
                                    <ThemeProvider theme={theme}>
                                        <StyledInput
                                            id="mui-theme-provider-outlined-input1"
                                            className={classes.input}
                                            label="Usuario"
                                            variant="outlined"
                                            name="user"
                                            value={user.username}
                                        />
                                        <StyledInput
                                            id="mui-theme-provider-outlined-input2"
                                            className={classes.input}
                                            label="Correo"
                                            variant="outlined"
                                            name="email"
                                            value={user.email}
                                        />
                                        <StyledInput
                                            id="mui-theme-provider-outlined-input3"
                                            className={classes.input}
                                            label="Departamento"
                                            variant="outlined"
                                            name="depto"
                                            value={"Sacatepequez"}
                                        />
                                    </ThemeProvider>
                                </div>
                                <div className={classes.inputs}>
                                    <ThemeProvider theme={theme}>
                                        <StyledInput
                                            id="mui-theme-provider-outlined-input4"
                                            className={classes.input}
                                            label="Nombres"
                                            variant="outlined"
                                            name="name"
                                            value={user.firstname || ""}
                                        />
                                        <StyledInput
                                            id="mui-theme-provider-outlined-input5"
                                            className={classes.input}
                                            label="Apellidos"
                                            variant="outlined"
                                            name="lastname"
                                            value={user.lastname || ""}
                                        />
                                        <StyledInput
                                            id="mui-theme-provider-outlined-input6"
                                            className={classes.input}
                                            label="Municipio"
                                            variant="outlined"
                                            name="city"
                                            value={"Sumpango"}
                                        />
                                    </ThemeProvider>
                                </div>
                            </div>
                            :
                            <Typography variant="h6" >No existen datos que mostrar</Typography>
                    }
                </div>
            </Paper>
        </>
    )
}

export default User;