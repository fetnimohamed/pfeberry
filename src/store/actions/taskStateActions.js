import Axios from 'axios';
import {
  TASKSTATE_CREATE_FAIL,
  TASKSTATE_CREATE_REQUEST,
  TASKSTATE_CREATE_SUCCESS,
  TASKSTATE_LIST_REQUEST,
  TASKSTATE_LIST_SUCCESS,
  TASKSTATE_LIST_FAIL ,
  TASKSTATE_DELETE_REQUEST,
  TASKSTATE_DELETE_SUCCESS,
  TASKSTATE_DELETE_FAIL,
  TASKSTATE_UPDATE_SUCCESS,
  TASKSTATE_UPDATE_FAIL,
  TASKSTATE_UPDATE_REQUEST,
  TASKSTATE_DETAILS_REQUEST,
  TASKSTATE_DETAILS_FAIL,
  TASKSTATE_DETAILS_SUCCESS
} from '../constants/taskStateConstants';

export const CreateTaskState = (name,description) => async (dispatch) => {
  dispatch({ type:TASKSTATE_CREATE_REQUEST });
  try {
    const { data } = await Axios.post('/api/taskStates/create', {
      name,
      description,
    });
    dispatch({ type:TASKSTATE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type:TASKSTATE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const listTaskStates = () => async (dispatch, getState) => {
  dispatch({ type: TASKSTATE_LIST_REQUEST });
  try {
    const {
     userSignin: { userInfo },
   } = getState();
    const { data } = await Axios.get('/api/taskStates/', {
     headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: TASKSTATE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASKSTATE_LIST_FAIL, payload: message });
  }
};

export const deleteTaskState = (taskStateId) => async (dispatch, getState) => {
  dispatch({ type: TASKSTATE_DELETE_REQUEST, payload:taskStateId});
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/taskStates/${taskStateId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TASKSTATE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASKSTATE_DELETE_FAIL, payload: message });
  }
};

export const updateTaskState = (taskState) => async (dispatch, getState) => {
  dispatch({ type: TASKSTATE_UPDATE_REQUEST, payload: taskState });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/taskStates/${taskState._id}`, taskState, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TASKSTATE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASKSTATE_UPDATE_FAIL, error: message });
  }
};

export const detailstaskStates = (taskStateId) => async (dispatch, getState) => {
  dispatch({ type: TASKSTATE_DETAILS_REQUEST, payload: taskStateId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/taskStates/${taskStateId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: TASKSTATE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASKSTATE_DETAILS_FAIL, payload: message });
  }
};
