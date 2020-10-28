import axios from 'axios';
import * as actionTypes from '../actionTypes';
import { BACKEND, routesApi } from '../../constants/api';
import jwtDecode from 'jwt-decode';
import { setAccessToken } from '../../utils/accessToken';
export function userRegistration(data, isLoading = true) {
    return dispatch => {
        dispatch({
            type: actionTypes.CREATE_USER_REQUEST,
            isLoading
        });

        return axios.post(`${BACKEND}${routesApi.user_create}`, data)
            .then(response => {
                if (response) {
                    dispatch({
                        type: actionTypes.CREATE_USER_RESPONSE,
                        payload: response.data
                    })
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch({
                        type: actionTypes.CREATE_USER_FAILURE,
                        error: response.data.error
                    })
                }
            });
    }
}

export function login(data, isLoading = true) {
    return dispatch => {
        dispatch({
            type: actionTypes.LOGIN_USER_REQUEST,
            isLoading
        });

        return axios.post(`${BACKEND}${routesApi.user_login}`, data)
            .then(response => {
                if (response) {
                    const token = response.data.token;
                    setAccessToken(token);
                    localStorage.setItem('jid', token);
                    dispatch({
                        type: actionTypes.LOGIN_USER_RESPONSE,
                        payload: response.data
                    });
                    const decoded = jwtDecode(token);
                    dispatch(authUserData(decoded));
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch({
                        type: actionTypes.LOGIN_USER_FAILURE,
                        error: response.data.error
                    })
                }
            });
    }
}

export function authUserData({ session_identifier }) {
    return dispatch => {
        if (!session_identifier || !(typeof session_identifier === "string")) {
            dispatch({
                type: actionTypes.AUTH_USER_RESPONSE,
                payload: {
                    data: {},
                    success: false
                }
            });
        } else {
            dispatch({
                type: actionTypes.AUTH_USER_REQUEST,
                isLoading: true
            });

            return axios.post(`${BACKEND}${routesApi.user_auth}`, { session_identifier })
                .then(response => {
                    if (response) {
                        dispatch({
                            type: actionTypes.AUTH_USER_RESPONSE,
                            payload: response.data
                        })
                    }
                })
                .catch(({ response }) => {
                    if (response) {
                        dispatch({
                            type: actionTypes.AUTH_USER_FAILURE,
                            error: response.data.error
                        })
                    }
                });
        }
    }
}

export function refreshToken() {
    return dispatch => {
        dispatch({
            type: actionTypes.GET_REFRESH_TOKEN_REQUEST,
            isLoading: true
        });
        const auth_token = localStorage.getItem('jid');
        localStorage.removeItem('jid');
        return axios.post(`${BACKEND}${routesApi.refresh}`, {}, {
            headers: {
                authorization: `bearer ${auth_token}`
            }
        })
            .then(response => {
                if (response) {
                    const token = response.data.token;
                    setAccessToken(token);
                    localStorage.setItem('jid', token)
                    dispatch({
                        type: actionTypes.GET_REFRESH_TOKEN_RESPONSE,
                        payload: response.data
                    });
                    if (token !== '') {
                        const decoded = jwtDecode(token);
                        dispatch(authUserData(decoded));
                    } else {
                        dispatch(authUserData({}));
                    }
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch({
                        type: actionTypes.GET_REFRESH_TOKEN_FAILURE,
                        error: response.data.errors
                    })
                }
            })
    }
}

export function logout(params) {
    return dispatch => {
        return axios.post(`${BACKEND}${routesApi.logout}`, params)
            .then(response => {
                if (response) {
                    setAccessToken("");
                    dispatch({
                        type: actionTypes.GET_LOGOUT_RESPONSE,
                        payload: response.data
                    });
                    localStorage.removeItem('jid')
                    dispatch(authUserData({}));
                }
            })
            .catch(({ response }) => {
                if (response) {
                    setAccessToken("");
                    localStorage.removeItem('jid')
                    dispatch({
                        type: actionTypes.GET_LOGOUT_RESPONSE,
                        payload: response.data.errors
                    });
                    dispatch(authUserData({}));
                }
            })
    }
}