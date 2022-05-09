import React from 'react';
import{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route ,Routes} from 'react-router-dom';
import { signout } from './actions/userActions';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserListScreen from './screens/UserListScreen';
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
import CreateSystemScreen from './screens/CreateSystemScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditUserScreen from './screens/EditUserScreen';
import SystemListScreen from './screens/SystemListScreen';
import SystemEditScreen from './screens/SystemEditScreen';
import GroupListScreen from './screens/GroupListScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';
import GroupEditScreen from './screens/GroupEditScreen';
import ComponentStateListScreen from './screens/CompStateListScreen';
import CompStateCreateScreen from './screens/compStateCreateScreen';
import CompStateEditScreen from './screens/CompStateEditScreen';
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
                    <Link to="/profile" >
                      Profile
                    </Link>
                  </li>
                  <hr></hr>
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
               <li>
                <Link  to="/systemList"> Systems </Link>
              </li>
                <li>
                <Link  to="/groupList"> Groups </Link>
              </li>
               <li>
                <Link  to="/compStateList"> Components States </Link>
              </li>
              </ul>
           </ul>
        </aside>
      
     
          
        <main>
             
          <Routes>
              <Route path='/compState/:id/edit' element={<CompStateEditScreen/>}></Route>
              <Route path='/compState/CreateCompState' element={<CompStateCreateScreen />}></Route>           
              <Route path='/compStateList' element={<ComponentStateListScreen/>}></Route>
              <Route path='/group/:id/edit' element={<GroupEditScreen/>}></Route>
              <Route path='/group/CreateGroup' element={<CreateGroupScreen />}></Route>           
              <Route path='/groupList' element={<GroupListScreen/>}></Route>
              <Route path='/system/:id/edit' element={<SystemEditScreen/>}></Route>
              <Route path="/system/CreateSystem" element={<CreateSystemScreen />}></Route>           
              <Route path="/systemList" element={<SystemListScreen/>}></Route>
              <Route path="/profile" element={<ProfileScreen/>}></Route>                                
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
              <Route path="/user/:id/edit" element={<EditUserScreen/>}></Route>
          </Routes>
        </main>
        <footer className="row center">All right reserved</footer>
     
      </div>
    </BrowserRouter>
  );
}
export default App;