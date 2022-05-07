import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function EditUserScreen(props) {
  
  let {id}=useParams()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSuperAdmin,setIsSuperAdmin]=useState();
  const [isAdmin,setIsAdmin]=useState();
  const [isDispatcher,setIsDispatcher]=useState();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const navigate =useNavigate()
  const userUpdate = useSelector((state) => state.userUpdate);
  const dispatch=useDispatch();
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  
    useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/usersList');
    }
    if (!user) {
      dispatch(detailsUser(id));
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setIsSuperAdmin(user.isSuperAdmin);
      setIsAdmin(user.isAdmin);
      setIsDispatcher(user.isDispatcher);
    }
  }, [dispatch,successUpdate, user, id,navigate]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: id, firstName,lastName, email,isSuperAdmin,isAdmin,isDispatcher}));
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit User {firstName}</h1>
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
              <label htmlFor="firstName">first Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter first Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="LastName">Last Name</label>
              <input
                id="LastName"
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>

             <div>
          <label htmlFor="post">Role </label>
          <br/>
          <input
            type="checkbox"
            name="role"
            checked={isSuperAdmin}
            onChange={(e) => setIsSuperAdmin(e.target.checked)}

          /> super Admin
           <input
            type="checkbox"
            name="role"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}

          /> admin
           <input
            type="checkbox"
            name="role"
            checked={isDispatcher}
            onChange={(e) => setIsDispatcher(e.target.checked)}

          /> Dispatcher
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