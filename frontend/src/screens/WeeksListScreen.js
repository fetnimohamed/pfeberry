import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteWeek,listWeeks } from '../actions/weekActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { WEEK_DETAILS_RESET } from '../constants/weekConstants';




export default function WeeksListScreen(props) {
  const [search,setSearch]=useState('');
  const weekList = useSelector((state) => state.weekList);
  const { loading, error, weeks } = weekList;
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const weekDelete = useSelector((state) => state.weekDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = weekDelete;


   
  useEffect(() => {
    
    dispatch(listWeeks());
    dispatch({
      type: WEEK_DETAILS_RESET,
    });
    
   }, [dispatch, successDelete]);


   const deleteHandler = (week) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteWeek(week._id));
    }
  };
  return (
    <div>
      <button 
       type="button"
      className="big"
      onClick={() => navigate(`/week/CreateWeek`)}> create week</button>
      
         <div className="row" >
        <input
          type="search"
          placeholder='search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        </div>
      <h1>Weeks</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
      <MessageBox variant="success">Week Deleted Successfully</MessageBox>
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
              <th>START DATE</th>
              <th>END DATE</th>
              <th>DESCRIPTION</th>
              <th>USER AFFECTED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          
          <tbody>
            
            {weeks.weeks.length>0&&
            weeks.weeks.map((week) => (
              <tr key={week._id}>
                <td>{week.name}</td>
                <td>{week.startDate}</td>
                <td>{week.endDate}</td>
                <td>{week.user.firstName}</td>
                <td>{week.description}</td>
                
                <td>
                 <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/week/${week._id}/edit`)}
                  >
                    Edit
                    </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(week)}
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