import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useNavigate } from 'react-router-dom';


export default function RegisterScreen(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuperAdmin,setIsSuperAdmin]=useState();
  const [isAdmin,setIsAdmin]=useState();
  const [isDispatcher,setIsDispatcher]=useState();

  const navigate=useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match');
    } else {
      dispatch(register(firstName,lastName, email, password,isSuperAdmin,isAdmin,isDispatcher));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate('/uersList')
    }
  });

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">first Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter first name"
            required
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="name">last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter last name"
            required
            onChange={(e) => setLastName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>

         <div>
          <label htmlFor="post">Role </label>
          <br/>
          <input
            type="checkbox"
            name="role"
            onChange={(e) => setIsSuperAdmin(e.target.checked)}

          /> super Admin
           <input
            type="checkbox"
            name="role"
            onChange={(e) => setIsAdmin(e.target.checked)}

          /> admin
           <input
            type="checkbox"
            name="role"
            onChange={(e) => setIsDispatcher(e.target.checked)}

          /> Dispatcher
        </div>
        {console.log(isDispatcher,isAdmin,isSuperAdmin)}
        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          
        </div>
      </form>
    </div>
  );
}