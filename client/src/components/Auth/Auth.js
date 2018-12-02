import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import history from '../../history';

export default class Auth {

    auth0 = new auth0.WebAuth({
        domain: AUTH_CONFIG.domain,
        clientID: AUTH_CONFIG.clientId,
        redirectUri: AUTH_CONFIG.callbackUrl,
        //audience: `https://${AUTH_CONFIG.domain}/userinfo`,
        audience: `https://sneakerstop.herokuapp.com`,     
        responseType: 'token id_token'
    });

    login = (username, password) => {
        this.auth0.login(
            { realm: AUTH_CONFIG.dbConnectionName, username, password },
            (err, authResult) => {
                if (err) {
                    console.log(err);
                    alert(`Error: ${err.description}. Check the console for further details.`);
                    return;
                }
            }
        );
    }

    signup = (email, password) => {
        this.auth0.signup(
            { connection: AUTH_CONFIG.dbConnectionName, email, password },
            (err) => {
                if (err) {
                    console.log(err);
                    alert(`Error: ${err.description}. Check the console for further details.`);
                    return;
                }
                this.auth0.login({ realm: AUTH_CONFIG.dbConnectionName, username: email, password },
                    (err, authResult) => {
                        if (err) {
                            console.log(err);
                            alert(`Error: ${err.description}. Check the console for further details.`);
                            return;
                        }
                    }
                );
            }   
        );
    }

    loginWithGoogle= () => {
        this.auth0.authorize({ connection: 'google-oauth2' });
    }

    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                console.log(authResult);
                this.setSession(authResult);
                history.replace('/home');
            } else if (err) {
                history.replace('/home');
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    setSession = (authResult) => {
        console.log(authResult.idTokenPayload);
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        localStorage.setItem('nickname', authResult.idTokenPayload.nickname);
        // navigate to the home route
        history.replace('/home');
    }

    logout = () => {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('nickname');
        // navigate to the home route
        history.replace('/home');
    }

    isAuthenticated = () => {
        // Check whether the current time is past the 
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}