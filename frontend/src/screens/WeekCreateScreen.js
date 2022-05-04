import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWeek} from '../actions/weekActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useNavigate } from 'react-router-dom';


export default function WeekCreateScreen(props) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const navigate=useNavigate();
  const  weekCreate= useSelector((state) => state.weekCreate);
  const { week, loading, error } = weekCreate;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (startDate >= endDate) {
      alert('StartDate and EndDate error');
    } else {
      dispatch(createWeek(name,startDate, endDate, description));
    }
  };
  useEffect(() => {
    if (week) {
      navigate('/')
    }
  });
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create week</h1>
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
          <label htmlFor="name">start Date</label>
          <input
            type="Date"
            id="startDate"
            placeholder="Enter start Date"
            required
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
        </div>
        <div>
            <label htmlFor="name">end Date</label>
          <input
            type="Date"
            id="endDate"
            placeholder="Enter end Date"
            required
            onChange={(e) => setEndDate(e.target.value)}
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
}