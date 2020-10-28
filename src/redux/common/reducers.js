import * as actionTypes from '../actionTypes';
import moment from 'moment';
const departmentsInitialState = {
    isLoading: false,
    error: null,
    success: false,
    departments: []
}

export const departmentsReducer = (state = departmentsInitialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DEPARTMENTS_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading,
                error: null,
                success: false
            }

        case actionTypes.GET_DEPARTMENTS_RESPONSE:
            return {
                ...state,
                isLoading: false,
                error: null,
                success: true,
                departments: action.payload
            }

        case actionTypes.GET_DEPARTMENTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                success: false,
                error: action.error
            }

        default:
            return state
    }
}

const deviceRealtimeInitialState = {
    connected: false,
    realtime_devices: []
}

export const realTimeDevices = (state = deviceRealtimeInitialState, action) => {
    switch (action.type) {
        case actionTypes.SET_DEVICE_REALTIME_CONNECTED: {
            const { data } = action.payload;
            const aux_arrary = state.realtime_devices;
            if (aux_arrary.length > 0) {
                if (!aux_arrary.find(item => item.uuid === data.device.uuid)) {
                    aux_arrary.push(data.device);
                }
            } else {
                aux_arrary.push(data.device);
            }

            return {
                ...state,
                realtime_devices: aux_arrary
            }
        }

        case actionTypes.SET_METRICS_BY_DEVICE_CONNECTED: {
            const { data } = action.payload;
            const { device, metrics } = data;
            const { realtime_devices } = state;
            const aux_devices = realtime_devices;
            const dev_index = aux_devices.findIndex(item => item.uuid === device.uuid);
            if (dev_index > -1) {
                if (aux_devices[dev_index]['metrics'] instanceof Array) {
                    if (metrics) {
                        let series_type = [];
                        for (const item of metrics) {
                            if (!series_type.includes(item.type)) {
                                series_type.push(item.type);
                            }
                        }
                        let aux_Obj = {
                            date: moment().toDate()
                        };
                        metrics.forEach(me => {
                            aux_Obj = {
                                ...aux_Obj,
                                [me.type]: Number(me.value)
                            }
                        });
                        aux_devices[dev_index].metrics.push(aux_Obj);
                    }
                } else {
                    aux_devices[dev_index]['metrics'] = [];
                    if (metrics) {
                        let series_type = [];
                        for (const item of metrics) {
                            if (!series_type.includes(item.type)) {
                                series_type.push(item.type);
                            }
                        }
                        let aux_Obj = {
                            date: moment().toDate()
                        };
                        metrics.forEach(me => {
                            aux_Obj = {
                                ...aux_Obj,
                                [me.type]: Number(me.value)
                            }
                        });
                        aux_devices[dev_index].metrics.push(aux_Obj);
                    }
                }
            } else {
                if (metrics) {
                    let series_type = [];
                    for (const item of metrics) {
                        if (!series_type.includes(item.type)) {
                            series_type.push(item.type);
                        }
                    }
                    let aux_Obj = {
                        date: moment().toDate()
                    };
                    metrics.forEach(me => {
                        aux_Obj = {
                            ...aux_Obj,
                            [me.type]: Number(me.value)
                        }
                    });
                    device['metrics'] = [aux_Obj];
                }
                aux_devices.push(device);
            }

            return {
                ...state,
                realtime_devices: aux_devices,
                connected: true
            }
        }

        case actionTypes.SET_DEVICE_REALTIME_DISCONNECTED: {
            const { data } = action.payload;
            const { realtime_devices } = state;
            let aux_devices = [];
            aux_devices = realtime_devices.filter(item => item.uuid !== data.device.uuid)
            return {
                ...state,
                realtime_devices: aux_devices,
                connected: false
            }
        }

        default:
            return state
    }
}