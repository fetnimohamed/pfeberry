import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useNavigate ,useParams } from 'react-router-dom';
import { CreateGroup } from '../actions/groupActions';
import {listUsers}from '../actions/userActions'
import {USER_DETAILS_RESET} from '../constants/userConstants'

export default function CreateGroupScreen(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [user,setUser]=useState('');
  const { pageNumber} = useParams();
  const search='';
  const navigate=useNavigate();
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const  groupCreate= useSelector((state) => state.groupCreate);
  const { group, loading, error } = groupCreate;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);
    dispatch(CreateGroup(name, description,user));
  };
   useEffect(() => {
    dispatch(listUsers({search,pageNumber}));

    dispatch({
      type: USER_DETAILS_RESET,
    });
   }, [dispatch,search,pageNumber,user]);
    
  
  useEffect(() => {
    if (group) {
      navigate('/groupList');
    }
  },[navigate,group]);


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
          <label htmlFor='userref'>admin affected</label>
          <select 
            onChange={(e) => {setUser(e.target.value)
            console.log("hello",e.target)
            console.log(user)
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
};