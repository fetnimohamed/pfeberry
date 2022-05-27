import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';
import Theme from '../views/taskTheme/theme';
import { TaskStatesList } from '../views/taskStates/taskStatesList';
import { TaskModelsList } from '../views/taskModels/TaskModelsList';
import { ComponentStatesList } from '../views/componentStates/ComponentStatesList';
import { Setting } from '../views/settings/Setting';

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
        <Route path={['/dashboard/default', '/theme', '/taskStates', '/taskModels', '/componentState', '/componentState', '/settings']}>
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>
                        <Route path="/dashboard/default" component={DashboardDefault} />

                        <Route path="/theme" component={Theme} />
                        <Route path="/taskStates" component={TaskStatesList} />
                        <Route path="/taskModels" component={TaskModelsList} />
                        <Route path="/componentState" component={ComponentStatesList} />
                        <Route path="/settings" component={Setting} />
                    </AuthGuard>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
