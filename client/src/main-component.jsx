import React from 'react';
import PropTypes from 'prop-types';
import { NotificationContainer } from 'react-notifications';
import LogService from './service/log-service';

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: { message: '', path: '' },
        };
    }

    componentDidCatch(error, errorInfo) {
        const e = { message: error.message, path: window.location.pathname };
        this.setState({ ...this.state, hasError: true, error: e });
        LogService.error(`${e.message}, pathname: ${e.path}`);
    }

    render() {
        return (
            <div className="content">

                {!this.state.hasError ? (
                    this.props.children
                ) : (
                    <div
                        className="text-center text-danger"
                        style={{ marginTop: '100px' }}
                    >
                        <h6>Error when loading page.</h6>
                        <small>{this.state.error.message}</small>
                        <br />
                        <small>{this.state.error.path}</small>
                    </div>
                )}
                <NotificationContainer />
            </div>
        );
    }
}

MainComponent.propTypes = {
    filter: PropTypes.object,
};

export default MainComponent;
