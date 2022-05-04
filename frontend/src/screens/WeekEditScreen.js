import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { detailsWeek, updateWeek } from '../actions/weekActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { WEEK_UPDATE_RESET } from '../constants/weekConstants';

export default function WeekEditScreen(props) {

  let {id}=useParams();
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate,setEndDate ] = useState('');
  const [description,setDescription]=useState('');
  const weekDetails = useSelector((state) => {
    return state.weekDetails});
  const { loading, error, week } = weekDetails;
  const navigate =useNavigate()
  const weekUpdate = useSelector((state) => state.weekUpdate);
  const dispatch=useDispatch();
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = weekUpdate;

  useEffect(()=>{
    console.log(weekDetails);
  },[])
    useEffect(() => {
    if (successUpdate) {
            navigate('/weekslist');
    }
    if (!week|| week._id !== id || successUpdate) {
      dispatch({ type: WEEK_UPDATE_RESET });
      dispatch(detailsWeek(id));
      console.log(week)
      
    } else {
      setName(week.name);
      setStartDate(week.startDate);
      setEndDate(week.endDate);
      setDescription(week.description);
    }
  }, [dispatch,successUpdate, week,navigate, id]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateWeek({ _id: id, name,startDate, endDate,description}));
  };
  return (
    
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit week {name}</h1>
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
              <label htmlFor="name"> Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="startDate">Start Date</label>
              <input
                id="startDate"
                type="date"
                placeholder="Enter Start Date"
                value={startDate}
                onChange={(e) => {
                  console.log(e.target.value);
                  setStartDate(e.target.value)}}
              ></input>
            </div>

            <div>
              <label htmlFor="endDate">end Date</label>
              <input
                id="endDate"
                type="date"
                placeholder="Enter end Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="description">description</label>
              <input
                id="description"
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