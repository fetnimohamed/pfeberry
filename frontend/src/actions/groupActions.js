import Axios from 'axios';
import {
  GROUP_CREATE_FAIL,
  GROUP_CREATE_REQUEST,
  GROUP_CREATE_SUCCESS,
  GROUP_LIST_REQUEST,
  GROUP_LIST_SUCCESS,
  GROUP_LIST_FAIL ,
  GROUP_DELETE_REQUEST,
  GROUP_DELETE_SUCCESS,
  GROUP_DELETE_FAIL,
  GROUP_UPDATE_SUCCESS,
  GROUP_UPDATE_FAIL,
  GROUP_UPDATE_REQUEST,
  GROUP_DETAILS_REQUEST,
  GROUP_DETAILS_FAIL,
  GROUP_DETAILS_SUCCESS
} from '../constants/groupConstants';

export const CreateGroup = (name,description,user) => async (dispatch) => {
  dispatch({ type:GROUP_CREATE_REQUEST });
  try {
    const { data } = await Axios.post('/api/groups/create', {
      name,
      description,
      user,
    });
    dispatch({ type:GROUP_CREATE_SUCCESS, payload: data.group });
  } catch (error) {
    dispatch({
      type:GROUP_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const listGroups = () => async (dispatch, getState) => {
  dispatch({ type: GROUP_LIST_REQUEST });
  try {
    const {
     userSignin: { userInfo },
   } = getState();
    const { data } = await Axios.get('/api/groups/', { 
     headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: GROUP_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GROUP_LIST_FAIL, payload: message });
  }
};

export const deleteGroup = (groupId) => async (dispatch, getState) => {
  dispatch({ type: GROUP_DELETE_REQUEST, payload:groupId});
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: GROUP_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GROUP_DELETE_FAIL, payload: message });
  }
};

export const updatedGroup= (group) => async (dispatch, getState) => {
  dispatch({ type: GROUP_UPDATE_REQUEST, payload: group });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/groups/${group._id}`, group, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: GROUP_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GROUP_UPDATE_FAIL, error: message });
  }
};

export const detailsGroups = (groupId) => async (dispatch, getState) => {
  dispatch({ type: GROUP_DETAILS_REQUEST, payload: groupId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: GROUP_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GROUP_DETAILS_FAIL, payload: message });
  }
};
