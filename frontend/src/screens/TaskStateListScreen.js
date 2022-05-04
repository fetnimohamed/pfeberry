import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTaskState,listTaskStates } from '../actions/taskStateActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { TASKSTATE_DETAILS_RESET } from '../constants/taskStateConstants';




export default function TaskStateListScreen(props) {
  const taskStateList = useSelector((state) => state.taskStateList);
  const { loading, error, taskStates } = taskStateList;
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const taskStateDelete = useSelector((state) => state.taskStateDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = taskStateDelete;


   
  useEffect(() => {
       dispatch(listTaskStates());

    dispatch({
      type: TASKSTATE_DETAILS_RESET,
    });
    
   }, [dispatch, successDelete]);

   useEffect(()=>{
     console.log(taskStates);
   })

   const deleteHandler = (taskState) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteTaskState(taskState._id));
    }
  };
  return (
    <div>
      <button 
       type="button"
      className="big"
      onClick={() => navigate(`/taskState/CreateTaskState`)}> create task State</button>
      <h1>task State</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
      <MessageBox variant="success">task State Deleted Successfully</MessageBox>
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
            
            {taskStates.taskStates.length >0 &&
             taskStates.taskStates.map((taskState) => (
              <tr key={taskState._id}>
                <td>{taskState.name}</td>
                <td>{taskState.description}</td>
                <td>
                 <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/taskState/${taskState._id}/edit`)}
                  >
                    Edit
                    </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(taskState)}
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