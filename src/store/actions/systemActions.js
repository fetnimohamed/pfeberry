import Axios from 'axios';
import {
  SYSTEM_CREATE_FAIL,
  SYSTEM_CREATE_REQUEST,
  SYSTEM_CREATE_SUCCESS,
  SYSTEM_LIST_REQUEST,
  SYSTEM_LIST_SUCCESS,
  SYSTEM_LIST_FAIL ,
  SYSTEM_DELETE_REQUEST,
  SYSTEM_DELETE_SUCCESS,
  SYSTEM_DELETE_FAIL,
  SYSTEM_UPDATE_SUCCESS,
  SYSTEM_UPDATE_FAIL,
  SYSTEM_UPDATE_REQUEST,
  SYSTEM_DETAILS_REQUEST,
  SYSTEM_DETAILS_FAIL,
  SYSTEM_DETAILS_SUCCESS
} from '../constants/systemConstants';

export const CreateSystem = (name,description) => async (dispatch) => {
  dispatch({ type:SYSTEM_CREATE_REQUEST });
  try {
    const { data } = await Axios.post('/api/systems/create', {
      name,
      description
    });
    dispatch({ type:SYSTEM_CREATE_SUCCESS, payload: data.system });
  } catch (error) {
    dispatch({
      type:SYSTEM_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const listSystems = () => async (dispatch, getState) => {
  dispatch({ type: SYSTEM_LIST_REQUEST });
  try {
    const {
     userSignin: { userInfo },
   } = getState();
    const { data } = await Axios.get('/api/systems/', { 
     headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: SYSTEM_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SYSTEM_LIST_FAIL, payload: message });
  }
};

export const deleteSystem = (systemId) => async (dispatch, getState) => {
  dispatch({ type: SYSTEM_DELETE_REQUEST, payload:systemId});
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/systems/${systemId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: SYSTEM_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SYSTEM_DELETE_FAIL, payload: message });
  }
};

export const updateSystem = (system) => async (dispatch, getState) => {
  dispatch({ type: SYSTEM_UPDATE_REQUEST, payload: system });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/Systems/${system._id}`, system, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: SYSTEM_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SYSTEM_UPDATE_FAIL, error: message });
  }
};

export const detailsSystems = (systemId) => async (dispatch, getState) => {
  dispatch({ type: SYSTEM_DETAILS_REQUEST, payload: systemId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/systems/${systemId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: SYSTEM_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SYSTEM_DETAILS_FAIL, payload: message });
  }
};
