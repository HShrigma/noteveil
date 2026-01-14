import { useUserContext } from "../../../context/users/userContext";
import { Login } from "../compositional/Login";
import { Signup } from "../compositional/Signup";


export const LoginScreen = () => {
    const ctx = useUserContext();
    return ( ctx.isLogin ? <Login /> : <Signup />);
};

export default LoginScreen;
