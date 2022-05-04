import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateTaskModel} from '../actions/taskModelActions';
import {listTaskThemes} from '../actions/taskThemeActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useNavigate } from 'react-router-dom';
import {TASKTHEME_DETAILS_RESET} from '../constants/taskThemeConstants'
//na9sa select option mt3 task theme

export default function CreateTaskModelCreateScreen(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [taskTheme,setTaskTheme]= useState('');
  const taskThemeList = useSelector((state) => state.taskThemeList);
  const { taskThemes } = taskThemeList;
  const navigate=useNavigate();
  const  taskModelCreate= useSelector((state) => state.taskModelCreate);
  const { taskModel,loading, error } = taskModelCreate;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(CreateTaskModel(name, description,taskTheme));
  };
    useEffect(() => {
       dispatch(listTaskThemes());
        dispatch({
      type: TASKTHEME_DETAILS_RESET,
    });
    
   }, [dispatch]);
  
  useEffect(() => {
    if (taskModel) {
      navigate('/taskModelsList')
    }
  },[navigate,taskModel,taskThemes]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Task Model</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name"> Name</label>
          <input
            type="text"
            id="Name"
            placeholder="Enter  name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        
        <div>
          <label htmlFor="description">description</label>
          <input
            type="text"
            id="Description"
            placeholder="Enter Description"
            required
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
  };