import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { userSigninReducer,
         userRegisterReducer ,
         userListReducer,
         userDeleteReducer,
         userUpdateReducer,
         userDetailsReducer,
         userUpdateProfileReducer,
        } from './reducers/userReducers';

import {
         weekListReducer,
         weekDeleteReducer,
         weekUpdateReducer,
         weekCreateReducer,
         weekDetailsReducer
} from './reducers/weekReducers'

import {
         taskThemeListReducer,
         taskThemeDeleteReducer,
         taskThemeUpdateReducer,
         taskThemeCreateReducer,
         taskThemeDetailsReducer
} from './reducers/taskThemeReducers'

import {
         taskStateListReducer,
         taskStateDeleteReducer,
         taskStateUpdateReducer,
         taskStateCreateReducer,
         taskStateDetailsReducer
} from './reducers/taskStateReducers'

import {
         taskModelListReducer,
         taskModelDeleteReducer,
         taskModelUpdateReducer,
         taskModelCreateReducer,
         taskModelDetailsReducer
} from './reducers/taskModelReducers'

import {
         systemListReducer,
         systemDeleteReducer,
         systemUpdateReducer,
         systemCreateReducer,
         systemDetailsReducer
} from './reducers/systemReducers';

import {
         groupListReducer,
         groupDeleteReducer,
         groupUpdateReducer,
         groupCreateReducer,
         groupDetailsReducer
} from './reducers/groupReducers'

import {
         compStateListReducer,
         compStateDeleteReducer,
         compStateUpdateReducer,
         compStateCreateReducer,
         compStateDetailsReducer
} from './reducers/compStateReducers'

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null
  }
  };
const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    weekList: weekListReducer,
    weekDelete: weekDeleteReducer,
    weekUpdate: weekUpdateReducer,
    weekCreate: weekCreateReducer,
    weekDetails:weekDetailsReducer,
    taskThemeList:taskThemeListReducer,
    taskThemeDelete:taskThemeDeleteReducer,
    taskThemeUpdate:taskThemeUpdateReducer,
    taskThemeCreate :taskThemeCreateReducer,
    taskThemeDetails:taskThemeDetailsReducer,
    taskStateList:taskStateListReducer,
    taskStateDelete:taskStateDeleteReducer,
    taskStateUpdate:taskStateUpdateReducer,
    taskStateCreate :taskStateCreateReducer,
    taskStateDetails:taskStateDetailsReducer,
    taskModelList:taskModelListReducer,
    taskModelDelete:taskModelDeleteReducer,
    taskModelUpdate:taskModelUpdateReducer,
    taskModelCreate :taskModelCreateReducer,
    taskModelDetails:taskModelDetailsReducer,
    systemList:systemListReducer,
    systemDelete:systemDeleteReducer,
    systemUpdate:systemUpdateReducer,
    systemCreate:systemCreateReducer,
    systemDetails:systemDetailsReducer,
    groupList:groupListReducer,
    groupDelete:groupDeleteReducer,
    groupUpdate:groupUpdateReducer,
    groupCreate:groupCreateReducer,
    groupDetails:groupDetailsReducer,
    compStateList:compStateListReducer,
    compStateDelete:compStateDeleteReducer,
    compStateUpdate:compStateUpdateReducer,
    compStateCreate:compStateCreateReducer,
    compStateDetails:compStateDetailsReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;