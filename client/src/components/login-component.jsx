import React from 'react';
import history from '../navigation/history';
import * as Authentication from '../helpers/authentication-helper';
import AuthenticationService from '../service/authentication-service';
import routes from '../navigation/routes';
import Cookies from 'js-cookie';
import ProductService from "../service/product-service";

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            username: '',
            password: '',
            formErrors: {
                email: '',
                password: '',
            },
            usernameValid: false,
            passwordValid: false,
            formValid: false,
            messageError: '',
            loggedIn: false,
        };
    }

    componentDidMount() {
        if (Authentication.isAuthenticated()) {
            history.push(routes.MAIN);
        }
    }

    authenticate(event) {
        event.preventDefault()

        const username = event.target[0].value;
        const password = event.target[1].value;

        ProductService.auth(
            {
                username,
                password
            }
        ).then(
            (response) => {
                Cookies.set('Authorization', response.data.token);
                window.location = routes.ADMIN;
            },
            (error) => {
                this.setState({
                    ...this.state,
                    loading: false,
                    messageError: 'Invalid password',
                });
            }
        );
    }

    render() {
        return (
            <div className="login-container">
                <div className="banner-login">
                </div>
                <div className="form-login">
                    <form className="form" id="loginForm" onSubmit={(event) => this.authenticate(event)}>
                        <h2>Login</h2>
                        <br/><br/>
                        <input type="text"
                               name='username'
                               placeholder='Username'
                               required
                        />
                        <input type="password"
                               name='password'
                               placeholder='Password'
                               required
                        />
                        <button type="submit" className="primary-button">Enter</button>
                    </form>
                </div>

            </div>

        );
    }
}

export default LoginComponent
