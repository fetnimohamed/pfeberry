import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTaskTheme,listTaskThemes } from '../actions/taskThemeActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { TASKTHEME_DETAILS_RESET } from '../constants/taskThemeConstants';




export default function TaskThemeListScreen(props) {
  const taskThemeList = useSelector((state) => state.taskThemeList);
  const { loading, error, taskThemes } = taskThemeList;
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const taskThemeDelete = useSelector((state) => state.taskThemeDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = taskThemeDelete;


   
  useEffect(() => {
       dispatch(listTaskThemes());

    dispatch({
      type: TASKTHEME_DETAILS_RESET,
    });
    
   }, [dispatch, successDelete]);

   
   const deleteHandler = (taskTheme) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteTaskTheme(taskTheme._id));
    }
  };
  return (
    <div>
      <button 
       type="button"
      className="big"
      onClick={() => navigate(`/taskTheme/CreateTaskTheme`)}> create task Theme</button>
      <h1>task Theme</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
      <MessageBox variant="success">task Theme Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (

        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>DESCRIPTION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          
          <tbody>
            
            {taskThemes.taskThemes.length >0 &&
             taskThemes.taskThemes.map((taskTheme) => (
              <tr key={taskTheme._id}>
                <td>{taskTheme.name}</td>
                <td>{taskTheme.description}</td>
                <td>
                 <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/taskTheme/${taskTheme._id}/edit`)}
                  >
                    Edit
                    </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(taskTheme)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}