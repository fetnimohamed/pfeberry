import {
  TASKMODEL_CREATE_FAIL,
  TASKMODEL_CREATE_REQUEST,
  TASKMODEL_CREATE_SUCCESS,
  TASKMODEL_CREATE_RESET,
  TASKMODEL_LIST_REQUEST,
  TASKMODEL_LIST_SUCCESS,
  TASKMODEL_LIST_FAIL,
  TASKMODEL_DELETE_REQUEST,
  TASKMODEL_DELETE_RESET,
  TASKMODEL_DELETE_SUCCESS,
  TASKMODEL_DELETE_FAIL,  
  TASKMODEL_UPDATE_REQUEST,
  TASKMODEL_UPDATE_RESET,
  TASKMODEL_UPDATE_SUCCESS,
  TASKMODEL_UPDATE_FAIL,
  TASKMODEL_DETAILS_FAIL,
  TASKMODEL_DETAILS_REQUEST,
  TASKMODEL_DETAILS_SUCCESS,
  TASKMODEL_DETAILS_RESET
} from '../constants/taskModelConstants';



export const taskModelCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASKMODEL_CREATE_REQUEST:
      return { loading: true };
    case TASKMODEL_CREATE_SUCCESS:
      return { loading: false, success: true, taskModel: action.payload };
    case TASKMODEL_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TASKMODEL_CREATE_RESET:
      return { loading: true };
    default:
      return state;
  }
};

export const taskModelListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TASKMODEL_LIST_REQUEST:
      return { loading: true };
    case TASKMODEL_LIST_SUCCESS:
      return { loading: false, taskModels: action.payload };
    case TASKMODEL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskModelDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASKMODEL_DELETE_REQUEST:
      return { loading: true };
    case TASKMODEL_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TASKMODEL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TASKMODEL_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const taskModelUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASKMODEL_UPDATE_REQUEST:
      return { loading: true };
    case TASKMODEL_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TASKMODEL_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TASKMODEL_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const taskModelDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TASKMODEL_DETAILS_REQUEST:
      return { loading: true };
    case TASKMODEL_DETAILS_SUCCESS:
      return { loading: false, taskModel: action.payload };
    case TASKMODEL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case TASKMODEL_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};
 