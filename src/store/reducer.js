import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import customizationReducer from './customizationReducer';
import accountReducer from './accountReducer';
import {
    userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userRegisterReducer,
    userSigninReducer,
    userUpdateProfileReducer,
    userUpdateReducer
} from './reducers/userReducers';
import {
    taskThemeListReducer,
    taskThemeDeleteReducer,
    taskThemeUpdateReducer,
    taskThemeCreateReducer,
    taskThemeDetailsReducer
} from './reducers/taskThemeReducers';
import {
    taskStateListReducer,
    taskStateDeleteReducer,
    taskStateUpdateReducer,
    taskStateCreateReducer,
    taskStateDetailsReducer
} from './reducers/taskStateReducers';
import {
    taskModelListReducer,
    taskModelDeleteReducer,
    taskModelUpdateReducer,
    taskModelCreateReducer,
    taskModelDetailsReducer
} from './reducers/taskModelReducers';
import {
         compStateListReducer,
         compStateDeleteReducer,
         compStateUpdateReducer,
         compStateCreateReducer,
         compStateDetailsReducer
} from './reducers/compStateReducers';
import {
  componentsListReducer,
  componentsDeleteReducer,
  componentsUpdateReducer,
  componentsCreateReducer,
  componentsDetailsReducer
} from './reducers/componentsReducers';
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
} from './reducers/groupReducers';
import {
         departementListReducer,
         departementDeleteReducer,
         departementUpdateReducer,
         departementCreateReducer,
         departementDetailsReducer
} from './reducers/departementReducers'
import {
         weekListReducer,
         weekDeleteReducer,
         weekUpdateReducer,
         weekCreateReducer,
         weekDetailsReducer
} from './reducers/weekReducers'
import {
  taskListReducer,
  taskDeleteReducer,
  taskUpdateReducer,
  taskCreateReducer,
  taskDetailsReducer
} from './reducers/taskReducers'
//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    taskThemeList: taskThemeListReducer,
    taskThemeDelete: taskThemeDeleteReducer,
    taskThemeUpdate: taskThemeUpdateReducer,
    taskThemeCreate: taskThemeCreateReducer,
    taskThemeDetails: taskThemeDetailsReducer,
    taskStateList: taskStateListReducer,
    taskStateDelete: taskStateDeleteReducer,
    taskStateUpdate: taskStateUpdateReducer,
    taskStateCreate: taskStateCreateReducer,
    taskStateDetails: taskStateDetailsReducer,
    taskModelList: taskModelListReducer,
    taskModelDelete: taskModelDeleteReducer,
    taskModelUpdate: taskModelUpdateReducer,
    taskModelCreate: taskModelCreateReducer,
    taskModelDetails: taskModelDetailsReducer,
    compStateList:compStateListReducer,
    compStateDelete:compStateDeleteReducer,
    compStateUpdate:compStateUpdateReducer,
    compStateCreate:compStateCreateReducer,
    compStateDetails:compStateDetailsReducer,
    componentsList:componentsListReducer,
    componentsDelete:componentsDeleteReducer,
    componentsUpdate:componentsUpdateReducer,
    componentsCreate:componentsCreateReducer,
    componentsDetails:componentsDetailsReducer,
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
    departementList:departementListReducer,
    departementDelete:departementDeleteReducer,
    departementUpdate:departementUpdateReducer,
    departementCreate:departementCreateReducer,
    departementDetails:departementDetailsReducer,
    weekList: weekListReducer,
    weekDelete: weekDeleteReducer,
    weekUpdate: weekUpdateReducer,
    weekCreate: weekCreateReducer,
    weekDetails:weekDetailsReducer,
    taskList:taskListReducer,
    taskDelete:taskDeleteReducer,
    taskUpdate:taskUpdateReducer,
    taskCreate:taskCreateReducer,
    taskDetails:taskDetailsReducer,
    account: persistReducer(
        {
            key: 'account',
            storage,
            keyPrefix: 'Leoni-'
        },
        accountReducer
    ),
    customization: customizationReducer
});

export default reducer;
