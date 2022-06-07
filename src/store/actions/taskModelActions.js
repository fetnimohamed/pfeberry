import Axios from 'axios';
import {
  TASKMODEL_CREATE_FAIL,
  TASKMODEL_CREATE_REQUEST,
  TASKMODEL_CREATE_SUCCESS,
  TASKMODEL_LIST_REQUEST,
  TASKMODEL_LIST_SUCCESS,
  TASKMODEL_LIST_FAIL ,
  TASKMODEL_DELETE_REQUEST,
  TASKMODEL_DELETE_SUCCESS,
  TASKMODEL_DELETE_FAIL,
  TASKMODEL_UPDATE_SUCCESS,
  TASKMODEL_UPDATE_FAIL,
  TASKMODEL_UPDATE_REQUEST,
  TASKMODEL_DETAILS_REQUEST,
  TASKMODEL_DETAILS_FAIL,
  TASKMODEL_DETAILS_SUCCESS
} from '../constants/taskModelConstants';

export const CreateTaskModel = (name,description,taskTheme) => async (dispatch) => {
  dispatch({ type:TASKMODEL_CREATE_REQUEST });
  try {
    const { data } = await Axios.post('/api/taskModels/create', {
      name,
      description,
      taskTheme,
    });
    dispatch({ type:TASKMODEL_CREATE_SUCCESS, payload: data.taskModel });
  } catch (error) {
    dispatch({
      type:TASKMODEL_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const listTaskModels = () => async (dispatch, getState) => {
  dispatch({ type: TASKMODEL_LIST_REQUEST });
  try {
    const {
     userSignin: { userInfo },
   } = getState();
    const { data } = await Axios.get('/api/taskModels/', { 
     headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: TASKMODEL_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASKMODEL_LIST_FAIL, payload: message });
  }
};

export const deleteTaskModel = (taskModelId) => async (dispatch, getState) => {
  dispatch({ type: TASKMODEL_DELETE_REQUEST, payload:taskModelId});
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/taskModels/${taskModelId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TASKMODEL_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASKMODEL_DELETE_FAIL, payload: message });
  }
};

export const updateTaskModel = (taskModel) => async (dispatch, getState) => {
  dispatch({ type: TASKMODEL_UPDATE_REQUEST, payload: taskModel });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/taskModels/${taskModel._id}`, taskModel, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TASKMODEL_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASKMODEL_UPDATE_FAIL, error: message });
  }
};

export const detailstaskModels = (taskModelId) => async (dispatch, getState) => {
  dispatch({ type: TASKMODEL_DETAILS_REQUEST, payload: taskModelId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/taskModels/${taskModelId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: TASKMODEL_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASKMODEL_DETAILS_FAIL, payload: message });
  }
};
