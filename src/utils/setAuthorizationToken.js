import axios from 'axios';
import { getAccessToken } from './accessToken';

export const setAuthorizationToken = store => next => action => {
    const accesssToken = getAccessToken();
    if (accesssToken) {
        axios.defaults.headers.common['authorization'] = `bearer ${accesssToken}`;
    } else {
        delete axios.defaults.headers.common['authorization'];
    }
    next(action);
}