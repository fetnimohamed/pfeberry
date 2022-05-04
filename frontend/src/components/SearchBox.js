import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBox(props) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/firstName/${firstName}` );

  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}