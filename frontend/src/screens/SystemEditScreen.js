import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { detailsSystems, updateSystem } from '../actions/systemActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { SYSTEM_UPDATE_RESET } from '../constants/systemConstants';

export default function SystemEditScreen(props) {
  
  let {id}=useParams()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const  systemDetails = useSelector((state) => state.systemDetails);
  const { loading, error, system } = systemDetails;
  const navigate =useNavigate()
  const systemUpdate = useSelector((state) => state.systemUpdate);
  const dispatch=useDispatch();
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = systemUpdate;

  
    useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SYSTEM_UPDATE_RESET });
      navigate('/systemList');
    }
    if (!system) {
      dispatch(detailsSystems(id));
    } else {
      setName(system.name);
      setDescription(system.description);
     
    }
  }, [dispatch,successUpdate, system, id,navigate]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateSystem({ _id: id, name,description}));
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit System {name}</h1>
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