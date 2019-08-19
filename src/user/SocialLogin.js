import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { socialLogin, authenticate } from '../auth';

class SocialLogin extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        };
    }

    responseGoogle = response => {
        // console.log('response', response);
        const tokenId = response.tokenId;
        const user = {
            tokenId: tokenId
        };

        socialLogin(user).then(data => {
            // console.log('signin data: ', data);
            if (data.error) {
                console.log('Error Login. Please try again..');
            } else {
                // console.log('signin success - setting jwt: ', data);
                authenticate(data, () => {
                    console.log('social login response from api', data);
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
    };

    render() {
        // redirect
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }

        return (
            <GoogleLogin
                // clientId="679380407525-2cvoah9gpsjjffc5k1p6atahhf2vqfl4.apps.googleusercontent.com"
                clientId="1080746444484-06it2vb5fgf1gknqu26du1m5lsussraa.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
            />
        );
    }
}

export default SocialLogin;
