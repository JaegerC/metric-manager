import * as actionTypes from '../actionTypes';

const historicalDataInitialState = {
    isLoading: false,
    error: null,
    success: false,
    data: {}
}

export const historicalData = (state = historicalDataInitialState, action) => {
    switch (action.type) {
        case actionTypes.GET_METRICS_HISTORICAL_BY_FILTER_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading,
                error: null
            }

        case actionTypes.GET_METRICS_HISTORICAL_BY_FILTER_RESPONSE:
            return {
                ...state,
                isLoading: false,
                error: null,
                success: action.success,
                data: action.payload
            }

        case actionTypes.GET_METRICS_HISTORICAL_BY_FILTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        case actionTypes.GET_METRICS_HISTORICAL_BY_FILTER_RESET:
            return {
                ...state,
                isLoading: false,
                error: null,
                success: false,
                data: {}
            }

        default:
            return state;
    }
}