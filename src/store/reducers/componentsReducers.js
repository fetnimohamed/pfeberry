import {
    COMPONENTS_CREATE_FAIL,
    COMPONENTS_CREATE_REQUEST,
    COMPONENTS_CREATE_SUCCESS,
    COMPONENTS_CREATE_RESET,
    COMPONENTS_LIST_REQUEST,
    COMPONENTS_LIST_SUCCESS,
    COMPONENTS_LIST_FAIL,
    COMPONENTS_DELETE_REQUEST,
    COMPONENTS_DELETE_RESET,
    COMPONENTS_DELETE_SUCCESS,
    COMPONENTS_DELETE_FAIL,  
    COMPONENTS_UPDATE_REQUEST,
    COMPONENTS_UPDATE_RESET,
    COMPONENTS_UPDATE_SUCCESS,
    COMPONENTS_UPDATE_FAIL,
    COMPONENTS_DETAILS_FAIL,
    COMPONENTS_DETAILS_REQUEST,
    COMPONENTS_DETAILS_SUCCESS,
    COMPONENTS_DETAILS_RESET
  } from '../constants/componentsConstants';
  
  
  
  export const componentsCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case COMPONENTS_CREATE_REQUEST:
        return { loading: true };
      case COMPONENTS_CREATE_SUCCESS:
        return { loading: false, success: true, components: action.payload };
      case COMPONENTS_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case COMPONENTS_CREATE_RESET:
        return { loading: true };
      default:
        return state;
    }
  };
  
  export const componentsListReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case COMPONENTS_LIST_REQUEST:
        return { loading: true };
      case COMPONENTS_LIST_SUCCESS:
        return { loading: false, components: action.payload };
      case COMPONENTS_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const componentsDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case COMPONENTS_DELETE_REQUEST:
        return { loading: true };
      case COMPONENTS_DELETE_SUCCESS:
        return { loading: false, success: true };
      case COMPONENTS_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case COMPONENTS_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const componentsUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case COMPONENTS_UPDATE_REQUEST:
        return { loading: true };
      case COMPONENTS_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case COMPONENTS_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case COMPONENTS_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const componentsDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case COMPONENTS_DETAILS_REQUEST:
        return { loading: true };
      case COMPONENTS_DETAILS_SUCCESS:
        return { loading: false, components: action.payload };
      case COMPONENTS_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case COMPONENTS_DETAILS_RESET:
        return { loading: true };
      default:
        return state;
    }
  };
  