import {
  TASKTHEME_CREATE_FAIL,
  TASKTHEME_CREATE_REQUEST,
  TASKTHEME_CREATE_SUCCESS,
  TASKTHEME_CREATE_RESET,
  TASKTHEME_LIST_REQUEST,
  TASKTHEME_LIST_SUCCESS,
  TASKTHEME_LIST_FAIL,
  TASKTHEME_DELETE_REQUEST,
  TASKTHEME_DELETE_RESET,
  TASKTHEME_DELETE_SUCCESS,
  TASKTHEME_DELETE_FAIL,  
  TASKTHEME_UPDATE_REQUEST,
  TASKTHEME_UPDATE_RESET,
  TASKTHEME_UPDATE_SUCCESS,
  TASKTHEME_UPDATE_FAIL,
  TASKTHEME_DETAILS_FAIL,
  TASKTHEME_DETAILS_REQUEST,
  TASKTHEME_DETAILS_SUCCESS,
  TASKTHEME_DETAILS_RESET
} from '../constants/taskThemeConstants';



export const taskThemeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASKTHEME_CREATE_REQUEST:
      return { loading: true };
    case TASKTHEME_CREATE_SUCCESS:
      return { loading: false, success: true, taskTheme: action.payload };
    case TASKTHEME_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TASKTHEME_CREATE_RESET:
      return { loading: true };
    default:
      return state;
  }
};

export const taskThemeListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TASKTHEME_LIST_REQUEST:
      return { loading: true };
    case TASKTHEME_LIST_SUCCESS:
      return { loading: false, taskThemes: action.payload };
    case TASKTHEME_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskThemeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASKTHEME_DELETE_REQUEST:
      return { loading: true };
    case TASKTHEME_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TASKTHEME_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TASKTHEME_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const taskThemeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASKTHEME_UPDATE_REQUEST:
      return { loading: true };
    case TASKTHEME_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TASKTHEME_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TASKTHEME_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const taskThemeDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TASKTHEME_DETAILS_REQUEST:
      return { loading: true };
    case TASKTHEME_DETAILS_SUCCESS:
      return { loading: false, taskTheme: action.payload };
    case TASKTHEME_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case TASKTHEME_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};
 