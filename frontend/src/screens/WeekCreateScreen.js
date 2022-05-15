import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWeek} from '../actions/weekActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {listUsers}from '../actions/userActions'
import {USER_DETAILS_RESET} from '../constants/userConstants';
import {useNavigate ,useParams } from 'react-router-dom';


export default function WeekCreateScreen(props) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [user,setUser]=useState('');
  const { pageNumber} = useParams();
  const search='';
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const navigate=useNavigate();
  const  weekCreate= useSelector((state) => state.weekCreate);
  const { week, loading, error } = weekCreate;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (startDate >= endDate) {
      alert('StartDate and EndDate error');
    } else {
      console.log(user);
      dispatch(createWeek(name,startDate, endDate, description,user));
    }
  };
  useEffect(() => {
    dispatch(listUsers({search,pageNumber}));

    dispatch({
      type: USER_DETAILS_RESET,
    });
   }, [dispatch,search,pageNumber,user]);


  useEffect(() => {
    if (week) {
      navigate('/weeksList')
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
          <label htmlFor='userref'>admin affected</label>
          <select 
            onChange={(e) => {setUser(e.target.value)
            console.log("hello",e.target)
            console.log(user);
          }
          }
          
          > 
                
                <option defaultValue >chose...</option>
            { 
            users?.users?.map((user)=>
            <option  
            value={user._id}
            key ={user._id}
            >{user.firstName}</option>
            )}
          </select>

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