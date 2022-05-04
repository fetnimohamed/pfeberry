import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTaskModel,listTaskModels } from '../actions/taskModelActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { TASKMODEL_DETAILS_RESET } from '../constants/taskModelConstants';




export default function TaskModelListScreen(props) {
  const taskModelList = useSelector((Model) => Model.taskModelList);
  const { loading, error, taskModels } = taskModelList;
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const taskModelDelete = useSelector((Model) => Model.taskModelDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = taskModelDelete;


   
  useEffect(() => {
       dispatch(listTaskModels());

    dispatch({
      type: TASKMODEL_DETAILS_RESET,
    });
    
   }, [dispatch, successDelete]);


   const deleteHandler = (taskModel) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteTaskModel(taskModel._id));
    }
  };
  return (
    <div>
      <button 
       type="button"
      className="big"
      onClick={() => navigate(`/taskModel/CreateTaskModel`)}> create task Model</button>
      <h1>task Model</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
      <MessageBox variant="success">task Model Deleted Successfully</MessageBox>
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
              <th>TASK THEME REF</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          
          <tbody>
            {console.log(taskModels)}
            {taskModels.taskModels.length >0 &&
             taskModels.taskModels.map((taskModel) => (
               
              <tr key={taskModel._id}>
                <td>{taskModel.name}</td>
                <td>{taskModel.description}</td>
                <td>{taskModel.taskTheme.name}</td>
                <td>
                 <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/taskModel/${taskModel._id}/edit`)}
                  >
                    Edit
                    </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(taskModel)}
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