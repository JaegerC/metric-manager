import axios from 'axios';
import * as actionTypes from '../actionTypes';
import { BACKEND, routesApi } from '../../constants/api';

export function getHistoricalByFilter(data, isLoading = true) {
    return dispatch => {
        dispatch({
            type: actionTypes.GET_METRICS_HISTORICAL_BY_FILTER_REQUEST,
            isLoading
        });

        return axios.post(`${BACKEND}${routesApi.metrics_historical}`, data)
            .then(response => {
                if (response) {
                    dispatch({
                        type: actionTypes.GET_METRICS_HISTORICAL_BY_FILTER_RESPONSE,
                        payload: response.data.data,
                        success: response.data.success
                    })
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch({
                        type: actionTypes.GET_METRICS_HISTORICAL_BY_FILTER_FAILURE,
                        error: response.data.error
                    })
                }
            });
    }
}