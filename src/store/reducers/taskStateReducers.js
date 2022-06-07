import {
  TASKSTATE_CREATE_FAIL,
  TASKSTATE_CREATE_REQUEST,
  TASKSTATE_CREATE_SUCCESS,
  TASKSTATE_CREATE_RESET,
  TASKSTATE_LIST_REQUEST,
  TASKSTATE_LIST_SUCCESS,
  TASKSTATE_LIST_FAIL,
  TASKSTATE_DELETE_REQUEST,
  TASKSTATE_DELETE_RESET,
  TASKSTATE_DELETE_SUCCESS,
  TASKSTATE_DELETE_FAIL,  
  TASKSTATE_UPDATE_REQUEST,
  TASKSTATE_UPDATE_RESET,
  TASKSTATE_UPDATE_SUCCESS,
  TASKSTATE_UPDATE_FAIL,
  TASKSTATE_DETAILS_FAIL,
  TASKSTATE_DETAILS_REQUEST,
  TASKSTATE_DETAILS_SUCCESS,
  TASKSTATE_DETAILS_RESET
} from '../constants/taskStateConstants';



export const taskStateCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASKSTATE_CREATE_REQUEST:
      return { loading: true };
    case TASKSTATE_CREATE_SUCCESS:
      return { loading: false, success: true, taskState: action.payload };
    case TASKSTATE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TASKSTATE_CREATE_RESET:
      return { loading: true };
    default:
      return state;
  }
};

export const taskStateListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TASKSTATE_LIST_REQUEST:
      return { loading: true };
    case TASKSTATE_LIST_SUCCESS:
      return { loading: false, taskStates: action.payload };
    case TASKSTATE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskStateDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASKSTATE_DELETE_REQUEST:
      return { loading: true };
    case TASKSTATE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TASKSTATE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TASKSTATE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const taskStateUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASKSTATE_UPDATE_REQUEST:
      return { loading: true };
    case TASKSTATE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TASKSTATE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TASKSTATE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const taskStateDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TASKSTATE_DETAILS_REQUEST:
      return { loading: true };
    case TASKSTATE_DETAILS_SUCCESS:
      return { loading: false, taskState: action.payload };
    case TASKSTATE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case TASKSTATE_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};
 