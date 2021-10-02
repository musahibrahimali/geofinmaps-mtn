import React, {useContext, useReducer, createContext} from 'react';
import {initialState} from "./Reducer";
import firebaseClient from "../config/firebaseClient";

export const StateContext = createContext(initialState);

export const AppState = ({reducer, initialState, children}) => {
    firebaseClient();
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext);

