import axios from 'axios';
import * as actionTypes from '../actionTypes';
import { BACKEND, routesApi } from '../../constants/api';

export function getDepartments(isLoading = true) {
    return dispatch => {
        dispatch({
            type: actionTypes.GET_DEPARTMENTS_REQUEST,
            isLoading
        });

        return axios.get(`${BACKEND}${routesApi.departments}`)
            .then(response => {
                dispatch({
                    type: actionTypes.GET_DEPARTMENTS_RESPONSE,
                    payload: response.data.data
                })
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch({
                        type: actionTypes.GET_DEPARTMENTS_FAILURE,
                        error: response.data.error
                    })
                }
            })
    }
}

export function setDeviceConnectData(data) {
    return dispatch => {
        dispatch({
            type: actionTypes.SET_DEVICE_REALTIME_CONNECTED,
            payload: data
        });
    }
}

export function setDeviceDisconnectedData(data) {
    return dispatch => {
        dispatch({
            type: actionTypes.SET_DEVICE_REALTIME_DISCONNECTED,
            payload: data
        });
    }
}

export function setMetricsByDevice(data) {
    return dispatch => {
        dispatch({
            type: actionTypes.SET_METRICS_BY_DEVICE_CONNECTED,
            payload: data
        })
    }

}