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