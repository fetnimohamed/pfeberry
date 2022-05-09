import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useNavigate } from 'react-router-dom';
import { CreateGroup } from '../actions/groupActions';


export default function CreateGroupScreen(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate=useNavigate();
  const  groupCreate= useSelector((state) => state.groupCreate);
  const { group, loading, error } = groupCreate;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(CreateGroup(name, description));
  };
  
  useEffect(() => {
    if (group) {
      navigate('/groupList');
    }
  });


  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Group</h1>
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