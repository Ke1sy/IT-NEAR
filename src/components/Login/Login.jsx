import React from "react";
import LoginReduxForm from "./LoginForm";

const Login = ({onSubmit}) => {
    return (
        <div>
           <h1 className="text-center">Login Page</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
};

export default Login;