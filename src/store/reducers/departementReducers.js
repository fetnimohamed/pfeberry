import {
  DEPARTEMENT_CREATE_FAIL,
  DEPARTEMENT_CREATE_REQUEST,
  DEPARTEMENT_CREATE_SUCCESS,
  DEPARTEMENT_CREATE_RESET,
  DEPARTEMENT_LIST_REQUEST,
  DEPARTEMENT_LIST_SUCCESS,
  DEPARTEMENT_LIST_FAIL,
  DEPARTEMENT_DELETE_REQUEST,
  DEPARTEMENT_DELETE_RESET,
  DEPARTEMENT_DELETE_SUCCESS,
  DEPARTEMENT_DELETE_FAIL,  
  DEPARTEMENT_UPDATE_REQUEST,
  DEPARTEMENT_UPDATE_RESET,
  DEPARTEMENT_UPDATE_SUCCESS,
  DEPARTEMENT_UPDATE_FAIL,
  DEPARTEMENT_DETAILS_FAIL,
  DEPARTEMENT_DETAILS_REQUEST,
  DEPARTEMENT_DETAILS_SUCCESS,
  DEPARTEMENT_DETAILS_RESET
} from '../constants/departementConstants';



export const departementCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTEMENT_CREATE_REQUEST:
      return { loading: true };
    case DEPARTEMENT_CREATE_SUCCESS:
      return { loading: false, success: true, departement: action.payload };
    case DEPARTEMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DEPARTEMENT_CREATE_RESET:
      return { loading: true };
    default:
      return state;
  }
};

export const departementListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case DEPARTEMENT_LIST_REQUEST:
      return { loading: true };
    case DEPARTEMENT_LIST_SUCCESS:
      return { loading: false, departements: action.payload };
    case DEPARTEMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const departementDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTEMENT_DELETE_REQUEST:
      return { loading: true };
    case DEPARTEMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DEPARTEMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case DEPARTEMENT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const departementUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTEMENT_UPDATE_REQUEST:
      return { loading: true };
    case DEPARTEMENT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case DEPARTEMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case DEPARTEMENT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const departementDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case DEPARTEMENT_DETAILS_REQUEST:
      return { loading: true };
    case DEPARTEMENT_DETAILS_SUCCESS:
      return { loading: false, departement: action.payload };
    case DEPARTEMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case DEPARTEMENT_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};
