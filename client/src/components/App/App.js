import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class App extends Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired,
        children: PropTypes.array,
    }
    
    goTo(route) {
        this.props.history.replace(`/${route}`)
    }

    login = () => {
        this.props.history.replace('/login');
    }

    logout = () => {
        this.props.auth.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                <Navbar fluid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Auth0 - React</a>
                        </Navbar.Brand>
                        <Button
                            bsStyle="primary"
                            className="btn-margin"
                            onClick={this.goTo.bind(this, 'home')}>
                            Home
                        </Button>
                        {!isAuthenticated() && (
                            <Button
                                bsStyle="primary"
                                className="btn-margin"
                                onClick={this.login}>
                                Log In
                            </Button>
                        )}
                        {isAuthenticated() && (
                            <Button
                                bsStyle="primary"
                                className="btn-margin"
                                onClick={this.logout}>
                                Log Out
                            </Button>
                        )}
                    </Navbar.Header>
                </Navbar>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
