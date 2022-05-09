import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateComponent} from '../actions/taskModelActions';
import {listTaskThemes} from '../actions/taskThemeActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useNavigate } from 'react-router-dom';
import {COMPONENT_DETAILS_RESET} from '../constants/taskThemeConstants'
//na9sa select option mt3 task theme

export default function ComponentCreateScreen(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  //
  const  Create= useSelector((state) => state.Component);
  const { taskModel,loading, error } = componentStateCreate;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(Create Component(name, description,Component));
  };
    useEffect(() => {
       dispatch(listTaskModel());
        dispatch({
      type: TASK_MODEL_DETAILS_RESET,
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
          <h1>Create component</h1>
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
          <label htmlFor='componentRef'>component Ref</label>
          <select 
            onChange={(e) => {setComponent(e.target.value)
            console.log("hello",e.target)
            console.log(component)}
          }
          
          > 
                  
            { component?.component?.map((component)=>
            
            <option  
            value={component._id}
            key ={component._id}
            >{component.name}</option>
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