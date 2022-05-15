import Axios from 'axios';
import {
  WEEK_CREATE_FAIL,
  WEEK_CREATE_REQUEST,
  WEEK_CREATE_SUCCESS,
  WEEK_LIST_REQUEST,
  WEEK_LIST_SUCCESS,
  WEEK_LIST_FAIL ,
  WEEK_DELETE_REQUEST,
  WEEK_DELETE_SUCCESS,
  WEEK_DELETE_FAIL,
  WEEK_UPDATE_SUCCESS,
  WEEK_UPDATE_FAIL,
  WEEK_UPDATE_REQUEST,
  WEEK_DETAILS_REQUEST,
  WEEK_DETAILS_FAIL,
  WEEK_DETAILS_SUCCESS
} from '../constants/weekConstants';

export const createWeek = (name,startDate,endDate,description,user) => async (dispatch) => {
  dispatch({ type:WEEK_CREATE_REQUEST });
  try {
    const { data } = await Axios.post('/api/weeks/create', {
      name,
      startDate,
      endDate,
      description,
      user
    });
    dispatch({ type:WEEK_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type:WEEK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const listWeeks = () => async (dispatch, getState) => {
  dispatch({ type: WEEK_LIST_REQUEST });
  try {
    const {
     userSignin: { userInfo },
   } = getState();
    const { data } = await Axios.get('/api/weeks/', {
     headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: WEEK_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: WEEK_LIST_FAIL, payload: message });
  }
};

export const deleteWeek = (weekId) => async (dispatch, getState) => {
  dispatch({ type: WEEK_DELETE_REQUEST, payload: weekId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/weeks/${weekId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: WEEK_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: WEEK_DELETE_FAIL, payload: message });
  }
};

export const updateWeek = (week) => async (dispatch, getState) => {
  dispatch({ type: WEEK_UPDATE_REQUEST, payload: week });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/weeks/${week._id}`, week, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: WEEK_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: WEEK_UPDATE_FAIL, error: message });
  }
};

export const detailsWeek = (weekId) => async (dispatch, getState) => {
  dispatch({ type: WEEK_DETAILS_REQUEST, payload: weekId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/weeks/${weekId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    console.log(data)
    dispatch({ type: WEEK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: WEEK_DETAILS_FAIL, payload: message });
  }
};