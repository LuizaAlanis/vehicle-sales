import React, {Suspense} from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import routes from './routes'
import * as Authentication from '../helpers/authentication-helper'
import AdminNavbar from '../components/admin-navbar';
import Navbar from '../components/navbar';
import NotFound from '../pages/not-found';
import LoadingComponent from '../components/loading-component'
import MainComponent from "../main-component";
import browserHistory from "./history";
import LoginComponent from "../components/login-component";
import Home from "../pages/home";
import Admin from "../pages/admin";

function ApplicationRouter() {
    return (
        <Router history={browserHistory}>
            {Authentication.isAuthenticated() ? (
                <Suspense fallback={<LoadingComponent/>}>
                   <AdminNavbar/>
                </Suspense>
            ) : (
                <Suspense fallback={<LoadingComponent/>}>
                    <Navbar/>
                </Suspense>
            )}
            <MainComponent>
                <Suspense fallback={<LoadingComponent/>}>
                    <Switch>
                        <Route exact path={routes.LOGIN} component={LoginComponent}/>
                        <Route exact path={routes.ROOT} component={Home}/>
                        <Route exact path={routes.ADMIN} component={Admin}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Suspense>
            </MainComponent>
        </Router>
    );
}

export default ApplicationRouter;
