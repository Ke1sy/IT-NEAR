import React from "react";
import LoginReduxForm from "./LoginForm";

const Login = ({onSubmit, captchaUrl}) => {
    debugger
    return (
        <div>
           <h1 className="text-center">Login Page</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
};

export default Login;