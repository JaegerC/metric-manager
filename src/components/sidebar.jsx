import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MenuBar from '../screens/menu/menubar';
import adminRoutes from '../routes/menuroutes';
import { createSocket } from './socketHandler';
import { setDeviceConnectData, setDeviceDisconnectedData, setMetricsByDevice } from '../redux/common/action';

const SideBar = (props) => {
    const dispatch = useDispatch();
    const [io, setSocket] = useState();
    const { user } = useSelector(state => state.auth);
    const [/*actual_devices*/, setActualDevices] = useState([]);

    useEffect(() => {
        // dispatch(refreshToken());
        setSocket(createSocket());
    }, [])

    useEffect(() => {
        if (user && user.devices) {
            setActualDevices(user.devices);
        }
    }, [user])
    useEffect(() => {
        return () => {
            if (io) {
                io.close();
            }
        }
    }, [io])

    if (io) {
        io.on('connect', () => {
            io.on('device/message', (payload) => {
                dispatch(setMetricsByDevice({ data: payload }));
            })

            io.on('device/connected', (payload) => {
                dispatch(setDeviceConnectData({ data: payload }));
            })

            io.on('device/disconnected', (payload) => {
                dispatch(setDeviceDisconnectedData({ data: payload }));
            })
        });

    }
    // if (isLoading || tokenRefreshed.token === undefined) {
    //     return <CircularLoading isLoading={isLoading} />
    // }

    return (
        <MenuBar routes={adminRoutes} props={props} />
    );
}

export default SideBar;