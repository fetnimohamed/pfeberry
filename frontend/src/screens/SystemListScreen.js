import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteSystem,listSystemes } from '../actions/systemActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SystemListScreen(props) {
  const systemList = useSelector((state) => state.systemList);
  const { loading, error, systemes } = systemList;
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const systemDelete = useSelector((state) => state.systemDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = systemDelete;


   
  useEffect(() => {
    dispatch(listSystemes());
    
   }, [dispatch, successDelete]);
  const deleteHandler = (system) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteSystem(system._id));
    }
  };
  return (
    <div>
      <button 
       type="button"
      className="big"
      onClick={() => navigate(`/system/addSystem`)}> add system</button>
      <h1>systemes</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
      <MessageBox variant="success">system Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (

        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>DESCRIPTION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          
          <tbody>
            {systemes.systemes.length>0 && 
            systemes.systemes.map((system) => (
              <tr key={system._id}>
                <td>{system.name}</td>
                <td>{system.description}</td>
                <td>
                 <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/system/${system._id}/edit`)}
                  >
                    Edit
                    </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(system)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}