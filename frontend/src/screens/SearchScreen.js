import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SearchScreen(props) {
  const { firstName = 'all' } = useParams();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers({ firstName: firstName !== 'all' ? firstName : '' }));
  }, [dispatch, firstName]);
  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{users.users.length} Results</div>
        )}
      </div>
      <div className="row top">
                <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {users.users.length === 0 && (
                <MessageBox>No users Found</MessageBox>
              )}
              <div className="row center">
              <table className="table">
              <thead>
               <tr>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
               </tr>
              </thead>
                {users.users.map((user) => (
                 <tbody>
                   <tr key={user._id}>
                     <td>{user.firstName}</td>
                     <td>{user.lastName}</td>
                    <td>{user.email}</td>
              </tr>
             </tbody> 
            
                ))}
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}