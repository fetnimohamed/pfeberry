import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateSystem} from '../actions/systemActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useNavigate } from 'react-router-dom';


export default function CreateSystemScreen(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate=useNavigate();
  const  systemCreate= useSelector((state) => state.systemCreate);
  const { system, loading, error } = systemCreate;
  const dispatch = useDispatch();
  const submitHandler = (e) => {

    e.preventDefault();
    dispatch(CreateSystem(name, description));
  };
  
  useEffect(() => {
    if (system) {
      navigate('/systemList')
    }
  });


  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create System</h1>
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
          <label htmlFor="password">description</label>
          <input
            type="Description"
            id="Description"
            placeholder="Enter Description"
            required
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Create
          </button>
        </div>
        <div>
          <label />
          
        </div>
      </form>
    </div>
  );
  };