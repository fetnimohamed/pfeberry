import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { detailsCompState, updatedCompState } from '../actions/comStateActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { COMPSTATE_UPDATE_RESET } from '../constants/compStateConstants';

export default function CompStateEditScreen(props) {
  
  let {id}=useParams()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const  compStateDetails = useSelector((state) => state.compStateDetails);
  const { loading, error, compState } = compStateDetails;
  const navigate =useNavigate()
  const compStateUpdate = useSelector((state) => state.compStateUpdate);
  const dispatch=useDispatch();
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = compStateUpdate;

  
    useEffect(() => {
    if (successUpdate) {
      dispatch({ type: COMPSTATE_UPDATE_RESET });
      navigate('/compStateList');
    }
    if (!compState) {
      dispatch(detailsCompState(id));
    } else {
      setName(compState.name);
      setDescription(compState.description);
     
    }
  }, [dispatch,successUpdate, compState, id,navigate]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatedCompState({ _id: id, name,description}));
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit componenet state {name}</h1>
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