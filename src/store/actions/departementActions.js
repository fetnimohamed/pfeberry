import Axios from 'axios';
import {
  DEPARTEMENT_CREATE_FAIL,
  DEPARTEMENT_CREATE_REQUEST,
  DEPARTEMENT_CREATE_SUCCESS,
  DEPARTEMENT_LIST_REQUEST,
  DEPARTEMENT_LIST_SUCCESS,
  DEPARTEMENT_LIST_FAIL ,
  DEPARTEMENT_DELETE_REQUEST,
  DEPARTEMENT_DELETE_SUCCESS,
  DEPARTEMENT_DELETE_FAIL,
  DEPARTEMENT_UPDATE_SUCCESS,
  DEPARTEMENT_UPDATE_FAIL,
  DEPARTEMENT_UPDATE_REQUEST,
  DEPARTEMENT_DETAILS_REQUEST,
  DEPARTEMENT_DETAILS_FAIL,
  DEPARTEMENT_DETAILS_SUCCESS
} from '../constants/departementConstants';

export const CreateDepartement = (name,description,) => async (dispatch) => {
  dispatch({ type:DEPARTEMENT_CREATE_REQUEST });
  try {
    const { data } = await Axios.post('/api/departement/create', {
      name,
      description,

    });
    dispatch({ type:DEPARTEMENT_CREATE_SUCCESS, payload: data.departement });
  } catch (error) {
    dispatch({
      type:DEPARTEMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const listDepartement = () => async (dispatch, getState) => {
  dispatch({ type: DEPARTEMENT_LIST_REQUEST });
  try {
    const {
     userSignin: { userInfo },
   } = getState();
    const { data } = await Axios.get('/api/departement/', { 
     headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: DEPARTEMENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEPARTEMENT_LIST_FAIL, payload: message });
  }
};

export const deleteDepartement= (departementId) => async (dispatch, getState) => {
  dispatch({ type: DEPARTEMENT_DELETE_REQUEST, payload:departementId});
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/departement/${departementId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DEPARTEMENT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEPARTEMENT_DELETE_FAIL, payload: message });
  }
};

export const updatedDepartement= (departement) => async (dispatch, getState) => {
  dispatch({ type: DEPARTEMENT_UPDATE_REQUEST, payload: departement });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/departement/${departement._id}`, departement, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DEPARTEMENT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEPARTEMENT_UPDATE_FAIL, error: message });
  }
};

export const detailsDepartement = (departementId) => async (dispatch, getState) => {
  dispatch({ type: DEPARTEMENT_DETAILS_REQUEST, payload: departementId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/departement/${departementId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: DEPARTEMENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DEPARTEMENT_DETAILS_FAIL, payload: message });
  }
};
