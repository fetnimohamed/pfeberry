import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { detailsGroups, updatedGroup } from '../actions/groupActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { GROUP_UPDATE_RESET } from '../constants/groupConstants';

export default function GroupEditScreen(props) {
  
  let {id}=useParams()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
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
    if (successUpdate) {
      dispatch({ type: GROUP_UPDATE_RESET });
      navigate('/groupList');
    }
    if (!group) {
      dispatch(detailsGroups(id));
    } else {
      setName(group.name);
      setDescription(group.description);
     
    }
  }, [dispatch,successUpdate, group, id,navigate]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatedGroup({ _id: id, name,description}));
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