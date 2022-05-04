import Axios from 'axios';
import {
  TASKTHEME_CREATE_FAIL,
  TASKTHEME_CREATE_REQUEST,
  TASKTHEME_CREATE_SUCCESS,
  TASKTHEME_LIST_REQUEST,
  TASKTHEME_LIST_SUCCESS,
  TASKTHEME_LIST_FAIL ,
  TASKTHEME_DELETE_REQUEST,
  TASKTHEME_DELETE_SUCCESS,
  TASKTHEME_DELETE_FAIL,
  TASKTHEME_UPDATE_SUCCESS,
  TASKTHEME_UPDATE_FAIL,
  TASKTHEME_UPDATE_REQUEST,
  TASKTHEME_DETAILS_REQUEST,
  TASKTHEME_DETAILS_FAIL,
  TASKTHEME_DETAILS_SUCCESS
} from '../constants/taskThemeConstants';

export const CreateTaskTheme = (name,description) => async (dispatch) => {
  dispatch({ type:TASKTHEME_CREATE_REQUEST });
  try {
    const { data } = await Axios.post('/api/taskThemes/create', {
      name,
      description,
    });
    dispatch({ type:TASKTHEME_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type:TASKTHEME_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const listTaskThemes = () => async (dispatch, getState) => {
  dispatch({ type: TASKTHEME_LIST_REQUEST });
  try {
    const {
     userSignin: { userInfo },
   } = getState();
    const { data } = await Axios.get('/api/taskThemes/', {
     headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: TASKTHEME_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASKTHEME_LIST_FAIL, payload: message });
  }
};

export const deleteTaskTheme = (taskThemeId) => async (dispatch, getState) => {
  dispatch({ type: TASKTHEME_DELETE_REQUEST, payload:taskThemeId});
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/taskThemes/${taskThemeId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TASKTHEME_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASKTHEME_DELETE_FAIL, payload: message });
  }
};

export const updateTaskTheme = (taskTheme) => async (dispatch, getState) => {
  dispatch({ type: TASKTHEME_UPDATE_REQUEST, payload: taskTheme });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/taskThemes/${taskTheme._id}`, taskTheme, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TASKTHEME_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASKTHEME_UPDATE_FAIL, error: message });
  }
};

export const detailstaskThemes = (taskThemeId) => async (dispatch, getState) => {
  dispatch({ type: TASKTHEME_DETAILS_REQUEST, payload: taskThemeId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/taskThemes/${taskThemeId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: TASKTHEME_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASKTHEME_DETAILS_FAIL, payload: message });
  }
};
