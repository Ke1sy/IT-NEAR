import React, {FC} from "react";
import LoginReduxForm from "./LoginForm";
import { LoginFormDataPropsType } from "../../redux/reducers/types";

type PropsType = {
    login: ({email, password, rememberMe, captcha}: LoginFormDataPropsType) => void
    captchaUrl: string | null
}


const Login: FC<PropsType> = ({captchaUrl, login}) => {
    return (
        <div>
           <h1 className="text-center">Login Page</h1>
            <LoginReduxForm onSubmit={login} captchaUrl={captchaUrl}/>
        </div>
    )
};

export default Login;