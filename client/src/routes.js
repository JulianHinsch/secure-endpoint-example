import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';

import App from './components/App/App';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Loading from './components/Loading/Loading';

import APITest from './components/APITest/APITest';
import APIAuthTest from './components/APITest/APIAuthTest';
import ProtectedTest from './components/ProtectedTest/ProtectedTest';

import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    console.log('nextState,replace', nextState, replace);
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

/**
 * Redirect if the user is not logged in.
 * This route is for authenticated users only.
 * Note: Any use of auth.isAuthenticated is insecure as this can be manipulated by changing the 
 * expires_at field of localStorage.
 * However, api calls will be impossible without a valid access_token.
 * Thus all secure data must not be stored in the client, as usual, and must instead be stored on the server.
 */
const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            if(auth.isAuthenticated()) {
                return <Component {...props}/>
            } else {
                return <Redirect to={{pathname: "/login", state: { from: props.location }}}/>
            }}}/>
    );
}

/**
 * Redirect if the user is logged in.
 * This route is for unauthenticated users only.
 */
// const PublicRoute = ({ auth, component: Component, ...rest }) => {
//     return (
//         <Route {...rest} render={props => {
//             if(!auth.isAuthenticated()) {
//                 return <Component {...props}/>
//             } else {
//                 return <Redirect to={{pathname: "/", state: { from: props.location }}}/>
//             }}}/>
//     );
// }

const Routes = () => {
    return (
        <Router history={history} component={App}>
            <div>
                <Route path="/" render={(props) => <App auth={auth} {...props} />} />
                <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
                <Route path="/login" render={(props) => <Login auth={auth} {...props} />} />
                <Route path="/callback" render={(props) => {
                    console.log('props', props);
                    handleAuthentication(props);
                    return <Loading {...props} /> 
                }}/>
                <Route path='/test' component={APITest}/>
                <Route path='/authtest' component={APIAuthTest}/>
                <ProtectedRoute auth={auth} path='/protectedtest' component={ProtectedTest}/>
            </div>
        </Router>
    );
}

export default Routes;