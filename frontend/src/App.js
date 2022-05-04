import React from 'react';
import{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route ,Routes} from 'react-router-dom';
import { signout } from './actions/userActions';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import WeeksListScreen from './screens/WeeksListScreen';
import WeekCreateScreen from './screens/WeekCreateScreen';
import WeekEditScreen from './screens/WeekEditScreen';
import TaskThemeListScreen from './screens/TaskThemeListScreen';
import TaskThemeCreateScreen from './screens/TaskThemeCreateScreen';
import TaskThemeEditScreen from './screens/TaskThemeEditScreen';
import TaskStateListScreen from './screens/TaskStateListScreen';
import TaskStateCreateScreen from './screens/TaskStateCreateScreen';
import TaskStateEditScreen from './screens/TaskStateEditScreen';
import TaskModelListScreen from './screens/TaskModelListScreen';
import TaskModelCreateScreen from './screens/TaskModelCreateScreen';
import TaskModelEditScreen from './screens/TaskModelEditScreen';
import './App.css';


function App() {

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
    
      <div className="grid-container">
        <header className="row">
          <button
              type="button"
              className="openbtn"
              onClick={() => setSidebarIsOpen(true)}
            >☰
              <i className="fa fa-bars"></i>
            </button>
          
          <div>
            <Link className="brand" to="/">
              LEONI
            </Link>
        </div>
          <div>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.firstName} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin" >Sign In</Link>
            )}
          </div>
          
          
        </header>
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="">
            <li>
              <strong>LEONI</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="closebtn"
                type="button"
              >
                <i className="fa fa-close">×</i>
              </button>
             
            </li>
             <ul>
              <li>
                <Link  to="/usersList"> Users</Link>
              </li>
               <li>
                <Link  to="/weeksList"> Weeks</Link>
              </li>
              <li>
                <Link  to="/taskThemesList"> Task Themes</Link>
              </li>
              <li>
                <Link  to="/taskStatesList"> Task States</Link>
              </li>
              <li>
                <Link  to="/taskModelsList"> Task Models</Link>
              </li>
              </ul>
           </ul>
        </aside>
      
          
        <main>
          <Routes>
                      
              <Route path="/taskModel/:id/edit" element={<TaskModelEditScreen/>}></Route>                       
              <Route path="/taskModel/CreateTaskModel" element={<TaskModelCreateScreen />}></Route> 
              <Route path="/taskModelsList" element={< TaskModelListScreen />}></Route>              
              <Route path="/taskState/:id/edit" element={<TaskStateEditScreen/>}></Route>                       
              <Route path="/taskState/CreateTaskState" element={<TaskStateCreateScreen />}></Route> 
              <Route path="/taskStatesList" element={< TaskStateListScreen />}></Route>              
              <Route path="/taskTheme/:id/edit" element={<TaskThemeEditScreen/>}></Route>                       
              <Route path="/taskTheme/CreateTaskTheme" element={<TaskThemeCreateScreen />}></Route>           
              <Route path="/taskThemesList" element={< TaskThemeListScreen />}></Route>              
              <Route path="/week/:id/edit" element={<WeekEditScreen/>}></Route>            
              <Route path="/week/CreateWeek" element={<WeekCreateScreen />}></Route>           
              <Route path="/weeksList" element={< WeeksListScreen />}></Route>
              <Route path="/usersList" element={< UserListScreen />}></Route>
              <Route path="/usersList/pageNumber/:pageNumber" element={< UserListScreen /> } exact ></Route>

              <Route path="/user/register" element={<RegisterScreen/>}></Route>
              <Route path="/signin" element={ < SigninScreen /> } ></Route>
              <Route path="/" element={< HomeScreen />} exact></Route>
              <Route path="/user/:id/edit" element={<UserEditScreen/>}></Route>
          </Routes>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}
export default App;