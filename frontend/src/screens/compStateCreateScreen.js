import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateCompState} from '../actions/comStateActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useNavigate } from 'react-router-dom';


export default function CompStateCreateScreen(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate=useNavigate();
  const  compStateCreate= useSelector((state) => state.compStateCreate);
  const { compState, loading, error } = compStateCreate;
  const dispatch = useDispatch();
  const submitHandler = (e) => {

    e.preventDefault();
    dispatch(CreateCompState(name, description));
  };
  
  useEffect(() => {
    if (compState) {
      navigate('/compStatesList')
    }
  });


  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create component State</h1>
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