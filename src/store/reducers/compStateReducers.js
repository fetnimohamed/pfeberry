import {
  COMPSTATE_CREATE_FAIL,
  COMPSTATE_CREATE_REQUEST,
  COMPSTATE_CREATE_SUCCESS,
  COMPSTATE_CREATE_RESET,
  COMPSTATE_LIST_REQUEST,
  COMPSTATE_LIST_SUCCESS,
  COMPSTATE_LIST_FAIL,
  COMPSTATE_DELETE_REQUEST,
  COMPSTATE_DELETE_RESET,
  COMPSTATE_DELETE_SUCCESS,
  COMPSTATE_DELETE_FAIL,  
  COMPSTATE_UPDATE_REQUEST,
  COMPSTATE_UPDATE_RESET,
  COMPSTATE_UPDATE_SUCCESS,
  COMPSTATE_UPDATE_FAIL,
  COMPSTATE_DETAILS_FAIL,
  COMPSTATE_DETAILS_REQUEST,
  COMPSTATE_DETAILS_SUCCESS,
  COMPSTATE_DETAILS_RESET
} from '../constants/compStateConstants';



export const compStateCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPSTATE_CREATE_REQUEST:
      return { loading: true };
    case COMPSTATE_CREATE_SUCCESS:
      return { loading: false, success: true, compState: action.payload };
    case COMPSTATE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COMPSTATE_CREATE_RESET:
      return { loading: true };
    default:
      return state;
  }
};

export const compStateListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case COMPSTATE_LIST_REQUEST:
      return { loading: true };
    case COMPSTATE_LIST_SUCCESS:
      return { loading: false, compStates: action.payload };
    case COMPSTATE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const compStateDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPSTATE_DELETE_REQUEST:
      return { loading: true };
    case COMPSTATE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COMPSTATE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case COMPSTATE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const compStateUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPSTATE_UPDATE_REQUEST:
      return { loading: true };
    case COMPSTATE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COMPSTATE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COMPSTATE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const compStateDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case COMPSTATE_DETAILS_REQUEST:
      return { loading: true };
    case COMPSTATE_DETAILS_SUCCESS:
      return { loading: false, compState: action.payload };
    case COMPSTATE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case COMPSTATE_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};
