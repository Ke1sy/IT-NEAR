import React, {FC} from "react";
import LoginReduxForm from "./LoginForm";
import { LoginFormDataPropsType } from "../../redux/reducers/types";
import {Typography} from "@material-ui/core";

type PropsType = {
    login: ({email, password, rememberMe, captcha}: LoginFormDataPropsType) => void
    captchaUrl: string | null
}

const Login: FC<PropsType> = ({captchaUrl, login}) => {
    return (
        <div>
            <Typography gutterBottom variant="h3" style={{paddingTop: 30, textAlign: 'center'}}>
                Login
            </Typography>
            <LoginReduxForm onSubmit={login} captchaUrl={captchaUrl}/>
        </div>
    )
};

export default Login;