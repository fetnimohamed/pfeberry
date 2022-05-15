import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { detailsGroups, updatedGroup } from '../actions/groupActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { GROUP_UPDATE_RESET } from '../constants/groupConstants';
import {listUsers}from '../actions/userActions'
import {USER_DETAILS_RESET} from '../constants/userConstants'

export default function GroupEditScreen(props) {
  
  let {id}=useParams()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [user,setUser]=useState('');
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const { pageNumber} = useParams();
  const search='';
  const  groupDetails = useSelector((state) => state.groupDetails);
  const { loading, error, group } = groupDetails;
  const navigate =useNavigate()
  const groupUpdate = useSelector((state) => state.groupUpdate);
  const dispatch=useDispatch();
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = groupUpdate;

  useEffect(() => {
    dispatch(listUsers({search,pageNumber}));

    dispatch({
      type: USER_DETAILS_RESET,
    });
   }, [dispatch,search,pageNumber,user]);
      
  
    useEffect(() => {
    if (successUpdate) {
      dispatch({ type: GROUP_UPDATE_RESET });
      navigate('/groupList');
    }
    if (!group) {
      dispatch(detailsGroups(id));
    } else {
      setName(group.name);
      setDescription(group.description);
      setUser(group.user)
    }
  }, [dispatch,successUpdate, group, id,navigate]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatedGroup({ _id: id, name,description,user}));
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit group {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="Name"> Name</label>
              <input
                id="Name"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="Description"> description</label>
              <input
                id="Description"
                type="text"
                placeholder="Enter description"
                value={description}
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
              <button type="submit" className="primary">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}