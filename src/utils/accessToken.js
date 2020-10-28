import React from "react";

let accessToken = "";

export const setAccessToken = (token) => {
    accessToken = token;
};

export const getAccessToken = () => {
    return accessToken;
};

export const SessionContext = React.createContext(getAccessToken());