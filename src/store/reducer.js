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
    account: persistReducer(
        {
            key: 'account',
            storage,
            keyPrefix: 'berry-'
        },
        accountReducer
    ),
    customization: customizationReducer
});

export default reducer;
