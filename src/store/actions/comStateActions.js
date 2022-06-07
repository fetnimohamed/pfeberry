import Axios from 'axios';
import {
  COMPSTATE_CREATE_FAIL,
  COMPSTATE_CREATE_REQUEST,
  COMPSTATE_CREATE_SUCCESS,
  COMPSTATE_LIST_REQUEST,
  COMPSTATE_LIST_SUCCESS,
  COMPSTATE_LIST_FAIL ,
  COMPSTATE_DELETE_REQUEST,
  COMPSTATE_DELETE_SUCCESS,
  COMPSTATE_DELETE_FAIL,
  COMPSTATE_UPDATE_SUCCESS,
  COMPSTATE_UPDATE_FAIL,
  COMPSTATE_UPDATE_REQUEST,
  COMPSTATE_DETAILS_REQUEST,
  COMPSTATE_DETAILS_FAIL,
  COMPSTATE_DETAILS_SUCCESS
} from '../constants/compStateConstants';

export const CreateCompState = (name,description) => async (dispatch) => {
  dispatch({ type:COMPSTATE_CREATE_REQUEST });
  try {
    const { data } = await Axios.post('/api/compState/create', {
      name,
      description
    });
    dispatch({ type:COMPSTATE_CREATE_SUCCESS, payload: data.compState });
  } catch (error) {
    dispatch({
      type:COMPSTATE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const listCompState = () => async (dispatch, getState) => {
  dispatch({ type: COMPSTATE_LIST_REQUEST });
  try {
    const {
     userSignin: { userInfo },
   } = getState();
    const { data } = await Axios.get('/api/compState/', { 
     headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: COMPSTATE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COMPSTATE_LIST_FAIL, payload: message });
  }
};

export const deleteCompState = (comStateId) => async (dispatch, getState) => {
  dispatch({ type: COMPSTATE_DELETE_REQUEST, payload:comStateId});
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/compState/${comStateId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: COMPSTATE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COMPSTATE_DELETE_FAIL, payload: message });
  }
};

export const updatedCompState= (CompState) => async (dispatch, getState) => {
  dispatch({ type: COMPSTATE_UPDATE_REQUEST, payload: CompState });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/compState/${CompState._id}`, CompState, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: COMPSTATE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COMPSTATE_UPDATE_FAIL, error: message });
  }
};

export const detailsCompState = (CompStateId) => async (dispatch, getState) => {
  dispatch({ type: COMPSTATE_DETAILS_REQUEST, payload: CompStateId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/compState/${CompStateId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: COMPSTATE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COMPSTATE_DETAILS_FAIL, payload: message });
  }
};
