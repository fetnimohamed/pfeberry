import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { detailstaskStates, updateTaskState } from '../actions/taskStateActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { TASKSTATE_UPDATE_RESET } from '../constants/taskStateConstants';

export default function TaskStateEditScreen(props) {
  
  let {id}=useParams()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const  taskStateDetails = useSelector((state) => state.taskStateDetails);
  const { loading, error, taskState } = taskStateDetails;
  const navigate =useNavigate()
  const taskStateUpdate = useSelector((state) => state.taskStateUpdate);
  const dispatch=useDispatch();
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = taskStateUpdate;

  
    useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TASKSTATE_UPDATE_RESET });
      navigate('/taskStatesList');
    }
    if (!taskState) {
      dispatch(detailstaskStates(id));
    } else {
      setName(taskState.name);
      setDescription(taskState.description);
     
    }
  }, [dispatch,successUpdate, taskState, id,navigate]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateTaskState({ _id: id, name,description}));
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit task State {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="Name"> Name</label>
              <input
                id="Name"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="Description"> description</label>
              <input
                id="Description"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>        
            <div>
              <button type="submit" className="primary">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}