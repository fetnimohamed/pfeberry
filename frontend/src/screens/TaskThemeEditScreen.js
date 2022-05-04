import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailstaskThemes, updateTaskTheme} from '../actions/taskThemeActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useNavigate,useParams } from 'react-router-dom';
import { TASKTHEME_UPDATE_RESET } from '../constants/taskThemeConstants'; 

export default function TaskThemeEditScreen(props) {
  let {id}=useParams()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate=useNavigate();
  const taskThemeDetails = useSelector((state) => state.taskThemeDetails);
  const { loading, error, taskTheme } = taskThemeDetails;
  const taskThemeUpdate = useSelector((state) => state.taskThemeUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = taskThemeUpdate;

  const dispatch = useDispatch();
 
useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TASKTHEME_UPDATE_RESET });
      navigate('/taskThemesList');
    }
    if (!taskTheme) {
      dispatch(detailstaskThemes(id));
    } else {
      setName(taskTheme.name);
      setDescription(taskTheme.description);
    }
  }, [dispatch,successUpdate, taskTheme, id, navigate]);

  useEffect(()=>{
     if (!taskTheme) {
      dispatch(detailstaskThemes(id));
      
    } else {
      setName(taskTheme.name);
      setDescription(taskTheme.description);
      
    }
  },[dispatch,id,successUpdate,taskTheme])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateTaskTheme({ _id: id,name,description}));
  };
/*
 useEffect(() => {
    console.log('id',id);
    if (successUpdate) {
      dispatch({ type: TASKTHEME_UPDATE_RESET });
      navigate('/taskThemesList');
    }
   
  });*/

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
          <button className="primary" type="submit">
            Update
          </button>
        </div>
                </>
        )}
</form>
    </div>
  );
  };