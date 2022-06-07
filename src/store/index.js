import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { persistStore } from 'redux-persist';
import reducer from './reducer';

//-----------------------|| REDUX - MAIN STORE ||-----------------------//
const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
const persister = persistStore(store);

export { store, persister };
