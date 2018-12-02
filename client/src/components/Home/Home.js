import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <div className="container">
                {isAuthenticated() && (
                    <h4>
                        Welcome, {localStorage.getItem('nickname')}.
                        You are logged in!
                    </h4>
                )}
                {!isAuthenticated() && (
                    <h4>
                        You are not logged in! Please{' '}
                        <Link to={'/login'}>
                            Log In
                        </Link>
                        {' '}to continue.
                    </h4>
                )}
                <ul>
                    <li>
                        <Link to={'/test'}>
                            Test
                        </Link>
                    </li>
                    <li>
                        <Link to={'/authtest'}>
                            AuthTest
                        </Link>
                    </li>
                    <li>
                        <Link to={'/protectedtest'}>
                            Protected Test
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}