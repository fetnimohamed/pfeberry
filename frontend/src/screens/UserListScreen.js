import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useParams,Link} from 'react-router-dom';
import { deleteUser,listUsers} from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';






export default function UserListScreen(props) {
  const [search,setSearch]=useState('');
  const { pageNumber = 1 } = useParams();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users,  page, pages } = userList;
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;


   
  useEffect(() => {
    dispatch(listUsers({pageNumber}));

    dispatch({
      type: USER_DETAILS_RESET,
    });
   }, [dispatch, successDelete,pageNumber,]);

  const deleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id));
    }
  };

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
       return `/usersList/pageNumber/${filterPage}`;
  };


  const role =(user)=>{
     if (user.isSuperAdmin===true) {    
        return"super admin"}
        else if (user.isAdmin===true){
        return "admin"} 
        else {
        return "Dispatcher"}}      
  return (
    <div>
      <div>
      <button 
       type="button"
      className="big"
      onClick={() => navigate(`/user/register`)}> add User</button>
      </div>

       <div className="row">
        <input
          type="search"
          placeholder='search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
             </div>
       

      <h1>Users</h1>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
      <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (

        <table className="table">
          <thead>
            <tr>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          
          <tbody>
            {
            // eslint-disable-next-line array-callback-return
            users.users.filter((user) => {
            if (search === "") {
              return user;
            } else if (
              user.firstName.toLowerCase().includes(search.toLowerCase())
            ) {
              return user;
            };
            
          }).map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>        
                <td>{role(user)}</td>
                <td>
                 <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/user/${user._id}/edit`)}
                  >
                    Edit
                    </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? 'active' : ''}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
    </div>
  );
}