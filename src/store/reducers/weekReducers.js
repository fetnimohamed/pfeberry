import {
  WEEK_CREATE_FAIL,
  WEEK_CREATE_REQUEST,
  WEEK_CREATE_SUCCESS,
  WEEK_CREATE_RESET,
  WEEK_LIST_REQUEST,
  WEEK_LIST_SUCCESS,
  WEEK_LIST_FAIL,
  WEEK_DELETE_REQUEST,
  WEEK_DELETE_RESET,
  WEEK_DELETE_SUCCESS,
  WEEK_DELETE_FAIL,  
  WEEK_UPDATE_REQUEST,
  WEEK_UPDATE_RESET,
  WEEK_UPDATE_SUCCESS,
  WEEK_UPDATE_FAIL,
  WEEK_DETAILS_FAIL,
  WEEK_DETAILS_REQUEST,
  WEEK_DETAILS_SUCCESS,
  WEEK_DETAILS_RESET
} from '../constants/weekConstants';



export const weekCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WEEK_CREATE_REQUEST:
      return { loading: true };
    case WEEK_CREATE_SUCCESS:
      return { loading: false, success: true, week: action.payload };
    case WEEK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case WEEK_CREATE_RESET:
      return { loading: true };
    default:
      return state;
  }
};

export const weekListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case WEEK_LIST_REQUEST:
      return { loading: true };
    case WEEK_LIST_SUCCESS:
      return { loading: false, weeks: action.payload };
    case WEEK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const weekDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WEEK_DELETE_REQUEST:
      return { loading: true };
    case WEEK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case WEEK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case WEEK_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const weekUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case WEEK_UPDATE_REQUEST:
      return { loading: true };
    case WEEK_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case WEEK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case WEEK_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const weekDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case WEEK_DETAILS_REQUEST:
      return { loading: true };
    case WEEK_DETAILS_SUCCESS:
      return { loading: false, week: action.payload };
    case WEEK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case WEEK_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};
