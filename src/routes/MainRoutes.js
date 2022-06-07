import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';
import Theme from '../views/taskTheme/theme';
import { TaskStatesList } from '../views/taskStates/taskStatesList';
import { ComponentStatesList } from '../views/componentState/ComponentStatesList';
import { ComponentList } from '../views/components/ComponentList';
import { Setting } from '../views/settings/Setting';
import {SystemList} from '../views/system/SystemList';
import { GroupList } from '../views/group/GroupList';
import { DepartementList } from '../views/departement/departementList -';
import { WeekList } from '../views/weeks/weekList';
import ModelsList from '../views/taskModels/ModelsList';
import { TaskList } from '../views/tasks/taskList';
import {UserTask}from'../views/tasks/userTask';
import { TaskDetails } from '../views/tasks/taskDetails';
import { UserList } from '../views/users/usersList';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route path={['/dashboard/default',
         '/theme', 
         '/taskStates',
         '/taskModels',
          '/component', 
          '/componentState',
          '/settings',
          '/system',
           '/group', 
           '/departement',
           '/weeks',
           '/tasks',
           '/taskDetails/:id',
           '/myTasks',
           '/users',
            ]}>
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>
                        <Route path="/dashboard/default" component={DashboardDefault} />
                        <Route path="/users" component={UserList} />
                        <Route path="/myTasks" component={UserTask} />
                        <Route path="/taskDetails/:id" component={TaskDetails} />
                        <Route path="/tasks" component={TaskList} />
                        <Route path="/weeks" component={WeekList} />
                        <Route path="/component" component={ComponentList} />
                        <Route path="/departement" component={DepartementList} />
                        <Route path="/system" component={SystemList} />
                        <Route path="/theme" component={Theme} />
                        <Route path="/taskStates" component={TaskStatesList} />
                        <Route path="/taskModels" component={ModelsList} />
                        <Route path="/componentState" component={ComponentStatesList} />
                        <Route path="/settings" component={Setting} />
                      <Route path="/group" component={GroupList} />
                    </AuthGuard>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
