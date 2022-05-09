import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteComponent,listComoponents } from '../actions/componentActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { COMPONENT_DETAILS_RESET } from '../constants/componentConstants';




export default function ComponentListScreen(props) {
  const componentList = useSelector((state) => state.componentList);
  const { loading, error, components } = componentList;
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const componentDelete = useSelector((state) => state.componentDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = componentDelete;


   
  useEffect(() => {
       dispatch(listComponents());

    dispatch({
      type: COMPONENT_DETAILS_RESET,
    });
    
   }, [dispatch, successDelete]);

   useEffect(()=>{
     console.log(components);
   })

   const deleteHandler = (component) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteComponent(component._id));
    }
  };
  return (
    <div>
      <button 
       type="button"
      className="big"
      onClick={() => navigate(`/component/CreateComponent`)}> create task State</button>
      <h1>task State</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
      <MessageBox variant="success">component Deleted Successfully</MessageBox>
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
            
            {components.components.length >0 &&
             components.components.map((component) => (
              <tr key={component._id}>
                <td>{component.name}</td>
                <td>{component.description}</td>
                <td>
                 <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/component/${component._id}/edit`)}
                  >
                    Edit
                    </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(component)}
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