import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCompState, listCompState } from '../actions/comStateActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { COMPSTATE_DETAILS_RESET } from '../constants/compStateConstants';




export default function ComponentStateListScreen(props) {
  const compStateList = useSelector((state) => state.compStateList);
  const { loading, error, compStates } = compStateList;
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const compStateDelete = useSelector((state) => state.compStateDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = compStateDelete;
    const [search,setSearch]=useState('');


   
  useEffect(() => {
       dispatch(listCompState());

    dispatch({
      type: COMPSTATE_DETAILS_RESET,
    });
    
   }, [dispatch, successDelete]);

   const deleteHandler = (compState) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCompState(compState._id));
    }
  };
  return (
    <div>
      <div align="right">
      <button 
       type="button"
      className="big"
      onClick={() => navigate(`/compState/CreateCompState`)}> create task State</button>
      </div>
      <br></br>
      <div>
      <input
          type="search"
          placeholder='search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>



      <h1>task State</h1>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
      <MessageBox variant="success">copmponetstate Deleted Successfully</MessageBox>
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
            {console.log(compStates)}
            {compStates.componentState.length >0 &&
             compStates.componentState.filter((compState) => {
            if (search === "") {
              return compState;
            } else if (
              compState.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return compState;
            };
            
          }).map((compState) => (
              <tr key={compState._id}>
                <td>{compState.name}</td>
                <td>{compState.description}</td>
                <td>
                 <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/compState/${compState._id}/edit`)}
                  >
                    Edit
                    </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(compState)}
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