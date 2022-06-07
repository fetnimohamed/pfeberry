import {
  SYSTEM_CREATE_FAIL,
  SYSTEM_CREATE_REQUEST,
  SYSTEM_CREATE_SUCCESS,
  SYSTEM_CREATE_RESET,
  SYSTEM_LIST_REQUEST,
  SYSTEM_LIST_SUCCESS,
  SYSTEM_LIST_FAIL,
  SYSTEM_DELETE_REQUEST,
  SYSTEM_DELETE_RESET,
  SYSTEM_DELETE_SUCCESS,
  SYSTEM_DELETE_FAIL,  
  SYSTEM_UPDATE_REQUEST,
  SYSTEM_UPDATE_RESET,
  SYSTEM_UPDATE_SUCCESS,
  SYSTEM_UPDATE_FAIL,
  SYSTEM_DETAILS_FAIL,
  SYSTEM_DETAILS_REQUEST,
  SYSTEM_DETAILS_SUCCESS,
  SYSTEM_DETAILS_RESET
} from '../constants/systemConstants';



export const systemCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SYSTEM_CREATE_REQUEST:
      return { loading: true };
    case SYSTEM_CREATE_SUCCESS:
      return { loading: false, success: true, system: action.payload };
    case SYSTEM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SYSTEM_CREATE_RESET:
      return { loading: true };
    default:
      return state;
  }
};

export const systemListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SYSTEM_LIST_REQUEST:
      return { loading: true };
    case SYSTEM_LIST_SUCCESS:
      return { loading: false, systems: action.payload };
    case SYSTEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const systemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SYSTEM_DELETE_REQUEST:
      return { loading: true };
    case SYSTEM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SYSTEM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case SYSTEM_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const systemUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SYSTEM_UPDATE_REQUEST:
      return { loading: true };
    case SYSTEM_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case SYSTEM_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SYSTEM_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const systemDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SYSTEM_DETAILS_REQUEST:
      return { loading: true };
    case SYSTEM_DETAILS_SUCCESS:
      return { loading: false, system: action.payload };
    case SYSTEM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case SYSTEM_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};
