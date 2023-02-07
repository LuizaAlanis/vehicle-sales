import React from 'react';
import history from '../navigation/history';
import * as Authentication from '../helpers/authentication-helper';
import AuthenticationService from '../service/authentication-service';
import routes from '../navigation/routes';
import Cookies from 'js-cookie';

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

        // Validates if username and password are not empty.
        if (!this.state.username || !this.state.password) {
            this.setState({
                ...this.state,
                loading: false,
                messageError: 'Something went wrong',
            });
            return;
        }

        this.setState({...this.state, loading: true, messageError: ''});

        AuthenticationService.authenticate(
            this.state.username,
            this.state.password
        ).then(
            (response) => {
                this.setState({...this.state, loading: false});
                Cookies.set('oauth2Token', response.data.access_token);
                Cookies.set('oauth2RefreshToken', response.data.refresh_token);
                localStorage.setItem('loggedIn', 'true');
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
                    <form className="form" id="loginForm" onSubmit={this.authenticate}>
                        <h2>Login</h2>
                        <br/><br/>
                        <input type="text"
                               name='username'
                               placeholder='Username'
                               value={this.state.username}
                               required
                        />
                        <input type="password"
                               name='password'
                               placeholder='Password'
                               value={this.state.password}
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
