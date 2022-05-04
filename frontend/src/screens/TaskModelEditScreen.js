import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailstaskModels, updateTaskModel} from '../actions/taskModelActions';
import {listTaskThemes} from '../actions/taskThemeActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useNavigate,useParams } from 'react-router-dom';
import { TASKMODEL_UPDATE_RESET } from '../constants/taskModelConstants'; 
import {TASKTHEME_DETAILS_RESET} from '../constants/taskThemeConstants'


export default function TaskModelEditScreen(props) {
  let {id}=useParams()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [taskTheme, setTaskTheme] = useState('');
  const navigate=useNavigate();
  const taskModelDetails = useSelector((state) => state.taskModelDetails);
  const { loading, error, taskModel } = taskModelDetails;
  const taskModelUpdate = useSelector((state) => state.taskModelUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = taskModelUpdate;

  const dispatch = useDispatch();
  const taskThemeList = useSelector((state) => state.taskThemeList);
  const { taskThemes } = taskThemeList;
 
 
useEffect(() => {
     dispatch(listTaskThemes());
        dispatch({
      type: TASKTHEME_DETAILS_RESET})
    if (successUpdate) {
      dispatch({ type: TASKMODEL_UPDATE_RESET });
      navigate('/taskModelsList');
    }
    if (!taskModel) {
      dispatch(detailstaskModels(id));
    } else {
      setName(taskModel.name);
      setDescription(taskModel.description);
      setTaskTheme(taskModel.taskTheme);
    }
  }, [dispatch,successUpdate, taskModel, id, navigate]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateTaskModel({ _id: id,name,description,taskTheme}));
  };

 useEffect(() => {
    console.log('id',id);
    if (successUpdate) {
      dispatch({ type: TASKMODEL_UPDATE_RESET });
      navigate('/taskModelsList');
    }
   
  });

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Task Theme</h1>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{error}</MessageBox>}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
        <div>
          <label htmlFor="name"> Name</label>
          <input
            type="text"
            id="Name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        
        <div>
          <label htmlFor="password">description</label>
          <input
            type="Description"
            id="Description"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor='taskThemeRef'>task Theme Ref</label>
          <select 
            onChange={(e) => {setTaskTheme(e.target.value)
            console.log("hello",e.target)
            console.log(taskThemes)}
          }
          
          > 
                  
            { taskThemes?.taskThemes?.map((taskTheme)=>
            
            <option  
            value={taskTheme._id}
            key ={taskTheme._id}
            >{taskTheme.name}</option>
            )}
            <option defaultValue >chose...</option>
          </select>

        </div>

        <div>
          <button className="primary" type="submit">
            Update
          </button>
        </div>
                </>
        )}
</form>
    </div>
 );}
          