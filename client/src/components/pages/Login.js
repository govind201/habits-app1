import React, { Component } from "react";

import "../../utilities.css";
import "./Login.css";
import GoogleLogin, { GoogleLogout } from "react-google-login";

const GOOGLE_CLIENT_ID = '792384898936-17eq4677ondom7fk2i7bqbai5dvh55vu.apps.googleusercontent.com';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render() {
        return ( <>
        <div className="logo-container">
            <div className="logo">
                Welcome to your Habit Aquarium.
            </div>
            <div className="description">
                Keep track of good habits and grow your aquarium!
            </div>
            <div className="login-button">
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
            />
            </div>
        </div>
        </>
        );
    }

}

export default Login;