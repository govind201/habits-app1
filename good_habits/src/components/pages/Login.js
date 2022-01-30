import React  from "react";
import GoogleLogin  from "react-google-login";

const GOOGLE_CLIENT_ID = '600958172796-05nnr8dkvl4h6u9hm4r6lc6slt3plhfh.apps.googleusercontent.com'; 

function Login(props) {
        return ( <>
        <div >
            <div >
                Welcome
            </div>
            <div >
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={props.handleLogin}
              onFailure={(err) => console.log(err)}
            />
            </div>
        </div>
        </>
        );

}
 

export default Login;