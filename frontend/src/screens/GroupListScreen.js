import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteGroup ,listGroups } from '../actions/groupActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { GROUP_DETAILS_RESET } from '../constants/groupConstants';


export default function GroupListScreen(props) {
  const [search,setSearch]=useState('');
  const groupList = useSelector((state) => state.groupList);
  const { loading, error, groups } = groupList;
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const groupDelete = useSelector((state) => state.groupDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = groupDelete;


   
  useEffect(() => {
    
    dispatch(listGroups());
    dispatch({
      type: GROUP_DETAILS_RESET,
    });
    
   }, [dispatch, successDelete]);


   const deleteHandler = (group) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteGroup(group._id));
    }
  };
  return (
    <div>
      <div align="right">
      <button 
       type="button"
      className="big"
      onClick={() => navigate(`/group/CreateGroup`)}> create group</button> 
      </div>
        <div className="row" >
        <input
          type="search"
          placeholder='search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        </div>

      <h1>Groups</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
      <MessageBox variant="success">Group Deleted Successfully</MessageBox>
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
              <th>AFFECTED ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          
          <tbody>
           
            { groups.group.filter((group) => {
            if (search === "") {
              return group;
            } else if (
              group.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return group;
            };
            
          }).map((group) => (
              <tr key={group._id}>
                <td>{group.name}</td>
                <td>{group.description}</td>
                {console.log(group.user.firstName)}
                <td>{group.user.firstName}</td>
                <td>
                 <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/group/${group._id}/edit`)}
                  >
                    Edit
                    </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(group)}
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