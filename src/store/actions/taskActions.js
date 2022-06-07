import Axios from 'axios';
import {
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAIL ,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_UPDATE_REQUEST,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_FAIL,
  TASK_DETAILS_SUCCESS
} from '../constants/taskConstants';

export const CreateTask = (  
    name,
    description,
    week,
    user,
    startDate,
    endDate,
    taskModel,  
    component,
    departement,
    taskState) => async (dispatch,getState) => {
  dispatch({ type:TASK_CREATE_REQUEST });
  try {
     const {
     userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/tasks/create', {
     name,
    description,
    week,
    user,
    startDate,
    endDate,
    taskModel,  
    component,
    departement,
    taskState,
      
    },{ 
     headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type:TASK_CREATE_SUCCESS, payload: data.tasks });
  } catch (error) {
    dispatch({
      type:TASK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const listTask = () => async (dispatch, getState) => {
  dispatch({ type: TASK_LIST_REQUEST });
  try {
    const {
     userSignin: { userInfo },
   } = getState();
    const { data } = await Axios.get('/api/tasks/', { 
     headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: TASK_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASK_LIST_FAIL, payload: message });
  }
};

export const deleteTask = (taskId) => async (dispatch, getState) => {
  dispatch({ type: TASK_DELETE_REQUEST, payload:taskId});
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TASK_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASK_DELETE_FAIL, payload: message });
  }
};

export const updatetask = (task) => async (dispatch, getState) => {
  dispatch({ type: TASK_UPDATE_REQUEST, payload: task });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/tasks/${task._id}`, task, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TASK_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASK_UPDATE_FAIL, error: message });
  }
};

export const detailstask = (taskId) => async (dispatch, getState) => {
  dispatch({ type: TASK_DETAILS_REQUEST, payload: taskId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: TASK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASK_DETAILS_FAIL, payload: message });
  }
};
