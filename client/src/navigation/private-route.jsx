import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import LoginComponent from '../components/login-component';
import * as Authentication from '../helpers/authentication-helper';
import routes from '../navigation/routes';
import App from "../App"

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authority = rest.authority === undefined ? true : rest.authority;
    return (
        <Route
            {...rest}
            render={(props) => {
                return Authentication.isAuthenticated() ? (
                    authority ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={routes.MAIN} component={App} />
                    )
                ) : (
                    <Redirect to={routes.LOGIN} component={LoginComponent} />
                );
            }}
        />
    );
};

export default PrivateRoute;