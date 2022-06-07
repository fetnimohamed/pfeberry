import Axios from 'axios';
import {
  COMPONENTS_CREATE_FAIL,
  COMPONENTS_CREATE_REQUEST,
  COMPONENTS_CREATE_SUCCESS,
  COMPONENTS_LIST_REQUEST,
  COMPONENTS_LIST_SUCCESS,
  COMPONENTS_LIST_FAIL ,
  COMPONENTS_DELETE_REQUEST,
  COMPONENTS_DELETE_SUCCESS,
  COMPONENTS_DELETE_FAIL,
  COMPONENTS_UPDATE_SUCCESS,
  COMPONENTS_UPDATE_FAIL,
  COMPONENTS_UPDATE_REQUEST,
  COMPONENTS_DETAILS_REQUEST,
  COMPONENTS_DETAILS_FAIL,
  COMPONENTS_DETAILS_SUCCESS
} from '../constants/componentsConstants';

export const CreateComponenets = (name,description,taskTheme,taskModel) => async (dispatch) => {
  dispatch({ type:COMPONENTS_CREATE_REQUEST });
  try {
    const { data } = await Axios.post('/api/components/create', {
      name,
      description,
      taskTheme,
      taskModel
    });
    dispatch({ type:COMPONENTS_CREATE_SUCCESS, payload: data.components });
  } catch (error) {
    dispatch({
      type:COMPONENTS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const listComponents = () => async (dispatch, getState) => {
  dispatch({ type: COMPONENTS_LIST_REQUEST });
  try {
    const {
     userSignin: { userInfo },
   } = getState();
    const { data } = await Axios.get('/api/components/', { 
     headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: COMPONENTS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COMPONENTS_LIST_FAIL, payload: message });
  }
};

export const deleteComponents = (componentsId) => async (dispatch, getState) => {
  dispatch({ type: COMPONENTS_DELETE_REQUEST, payload:componentsId});
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/components/${componentsId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: COMPONENTS_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COMPONENTS_DELETE_FAIL, payload: message });
  }
};

export const updateComponentd = (components) => async (dispatch, getState) => {
  dispatch({ type: COMPONENTS_UPDATE_REQUEST, payload: components });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/components/${components._id}`, components, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: COMPONENTS_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COMPONENTS_UPDATE_FAIL, error: message });
  }
};

export const detailscomponents = (componentsId) => async (dispatch, getState) => {
  dispatch({ type: COMPONENTS_DETAILS_REQUEST, payload: componentsId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/components/${componentsId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: COMPONENTS_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COMPONENTS_DETAILS_FAIL, payload: message });
  }
};
