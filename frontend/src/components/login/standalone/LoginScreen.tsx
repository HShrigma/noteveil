import { Login } from "../compositional/Login";
import { Signup } from "../compositional/Signup";
import { signUpErrorType } from "../../../types/userTypes";
import { useUserContext } from "../../../context/users/userContext";


export const LoginScreen = () => {
    const userCtx = useUserContext();
    return ( 
           userCtx.isLogin ? 
           <Login 
                onLogin={userCtx.login}
                loginError={userCtx.loginError}
                onSignupScreenOpen={userCtx.openSignupScreen} />
           :
            <Signup
                onSignup={userCtx.signup}
                signupError={userCtx.signupError}
                onLoginScreenOpen={userCtx.openLoginScreen} />
           );
};

export default LoginScreen;
