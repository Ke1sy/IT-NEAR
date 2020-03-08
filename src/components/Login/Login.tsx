import React, {FC} from "react";
import LoginReduxForm from "./LoginForm";

type PropsType = {
    onSubmit: any
    captchaUrl: string | null
}

const Login: FC<PropsType> = ({onSubmit, captchaUrl}) => {
    return (
        <div>
           <h1 className="text-center">Login Page</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
};

export default Login;