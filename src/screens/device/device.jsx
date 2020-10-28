import React, { useEffect, useState } from 'react';
import { useStyles } from './device.styles';
import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import { useSelector } from 'react-redux';

const Device = () => {
    const classes = useStyles();
    const { user } = useSelector(state => state.auth);
    const [devices, setDevices] = useState([]);
    useEffect(() => {
        setDevices(user.devices);
    }, [user])
    return (
        <>
            <Paper elevation={10} className={classes.paper} >
                <div className={classes.title}>Dispositivos</div>
                <div className={classes.dataContainer}>
                    {
                        devices && devices.length > 0 ?
                            devices.map(device => (
                                <Paper elevation={5} className={classes.deviceContainer} key={device.id}>
                                    <div className={classes.deviceSection} >
                                        <div className={classes.deviceTitle}>Dispositivo</div>
                                        <div className={classes.device}>
                                            <DeviceHubIcon className={classes.deviceIcon} />
                                            <Typography align="left" className={classes.deviceName}>{device.hostname} - {device.name}</Typography>
                                        </div>
                                    </div>
                                    <hr className={classes.line} />
                                    <div className={classes.deviceSection}>
                                        <div className={classes.deviceTitle}>Metrica</div>
                                        <div className={classes.demo}>
                                            <List dense={false}>
                                                {
                                                    device.metrics.length > 1 ?
                                                        device.metrics.map(sensor => (
                                                            <ListItem className={classes.labelIcon} key={sensor.id} >
                                                                <ListItemIcon>
                                                                    <LabelOutlinedIcon />
                                                                </ListItemIcon>
                                                                <ListItemText
                                                                    primary={sensor.type}
                                                                />
                                                            </ListItem>
                                                        ))
                                                        :
                                                        <div>El dispositivo no tiene sensores conectados</div>
                                                }
                                            </List>
                                        </div>
                                    </div>
                                </Paper>
                            ))
                            :
                            <Typography variant="h6" >No hay dispositivos disponibles</Typography>
                    }
                </div>
            </Paper>
        </>
    )
}

export default Device;