import * as actionTypes from '../actionTypes';

const userRegistartionInitialState = {
    isLoading: false,
    error: null,
    success: false,
    data: {}
}

export const userRegistrationReducer = (state = userRegistartionInitialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_USER_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading,
                error: null
            }

        case actionTypes.CREATE_USER_RESPONSE:
            const { data, success } = action.payload;
            return {
                ...state,
                isLoading: false,
                error: null,
                success,
                data
            }

        case actionTypes.CREATE_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        default:
            return state
    }
}

const userLoginInitualState = {
    isLoading: false,
    error: null,
    token: {},
    success: false
}

export const loginUserReducer = (state = userLoginInitualState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading,
                error: false,
            }

        case actionTypes.LOGIN_USER_RESPONSE:
            const { success, token } = action.payload;
            return {
                ...state,
                isLoading: false,
                success: success,
                error: null,
                token
            }

        case actionTypes.LOGIN_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        default:
            return state
    }
}

const authInitialState = {
    isLoading: false,
    error: null,
    user: {},
    isAuthenticated: false
}

export const auth = (state = authInitialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_USER_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading,
                error: null
            }

        case actionTypes.AUTH_USER_RESPONSE:
            const { success, data } = action.payload;
            return {
                ...state,
                isLoading: false,
                error: null,
                isAuthenticated: success,
                user: data
            }

        case actionTypes.AUTH_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            }

        default:
            return state
    }
}

const accesTokenRefreshInitialState = {
    isLoading: false,
    error: null,
    tokenRefreshed: {}
}

export const newAccessToken = (state = accesTokenRefreshInitialState, action) => {
    switch (action.type) {
        case actionTypes.GET_REFRESH_TOKEN_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading,
                error: null
            }

        case actionTypes.GET_REFRESH_TOKEN_RESPONSE:
            return {
                ...state,
                isLoading: false,
                error: null,
                tokenRefreshed: action.payload
            }

        case actionTypes.GET_REFRESH_TOKEN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        default:
            return state
    }
}

const logoutInitialState = {
    success: {}
}

export const logoutResponse = (state = logoutInitialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LOGOUT_RESPONSE:
            return {
                ...state,
                success: action.payload
            };
        default:
            return state;
    }
}
