import { useState } from 'react';
import DefaultHeader from './components/header/standalone/Header';
import MainScreen from './components/MainScreen';
import { MAIN_STATES, MainState } from './utils/registries';
import { ProjectsProvider } from './context/projects/ProjectsProvider';
import { signUpErrorType, signupValidationParams, UserData, UserType } from './types/userTypes';
import { createTempId } from './utils/mathUtils';

function App() {
    const sampleUser = { id: 1, userName: "test", email: "sample@mail.com", password: "123!@#ABCabc" };
    const [state, setState] = useState<MainState>(MAIN_STATES.LOGIN_DISPLAY);
    const [user, setUser] = useState<UserType>(null);
    const [tempUsers, setTempUsers] = useState<UserData[]>([sampleUser]);
    // PlaceHolder validation
    const [loginError, setLoginError] = useState(false);
    const [signupError, setSignupError] = useState<signUpErrorType>(null);

    const [isLogin, setIsLogin] = useState(true);

    const handleLoginAttempt = (email: string, password: string) => {
        const foundUser = tempUsers.find(user => user.email === email && user.password === password);
        if (foundUser) {
            setLoginError(false);
            handleLogin(foundUser);
            return;
        }
        setLoginError(true);
    }

    const getSignupLengthError = (userName: string, password: string) => {
        if (userName.length < signupValidationParams.minUser) return "userTooShort";
        if (userName.length > signupValidationParams.maxUser) return "userTooLong";

        if (password.length < signupValidationParams.minPassword) return "passwordTooShort"
        if (password.length > signupValidationParams.maxPassword) return "passwordTooLong";

        return null;
    }

    const getEmailValidityError = (email: string) => {
        return tempUsers.find(user => user.email === email) ? "emailExists" : null;
    }

    const IsPasswordValid = (password: string) => {
        const { upper, lower, number, symbol } = signupValidationParams.passwordRequires;

        if (upper && !/[A-Z]/.test(password)) return false;
        if (lower && !/[a-z]/.test(password)) return false;
        if (number && !/[0-9]/.test(password)) return false;
        if (symbol && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

        return true;
    }

    const getPasswordValidationError = (password: string) => {
        return IsPasswordValid(password) ? null : "passwordContentsWrong";
    }
    const getSignupValdationError = (email: string, userName: string, password: string) => {
        const lengthErr = getSignupLengthError(userName, password);
        if (lengthErr !== null) return lengthErr;

        const emailErr = getEmailValidityError(email);
        if (emailErr !== null) return emailErr;

        const passErr = getPasswordValidationError(password);
        if(passErr !== null) return passErr;

        return null;
    }

    const handleSignupAttempt = (email: string, userName: string, password: string) => {
        const err = getSignupValdationError(email, userName, password);
        if (err === null) {
            const newUser = { id: createTempId(), email, userName, password };
            setTempUsers(prev => [...prev, newUser]);
            handleLogin(newUser);
        }

        setSignupError(err);
    }

    const handleDisplayChange = (value: MainState) => {
        setState(value);
    };

    const handleProjectOpened = (id: number) => {
        handleDisplayChange(MAIN_STATES.TASK_DISPLAY);
    }
    const handleLogin = (user: UserData) => {
        setUser(user);
        handleDisplayChange(MAIN_STATES.PROJECTS_DISPLAY);
    }
    const handleLogout= () => {
        setUser(null);
        handleDisplayChange(MAIN_STATES.LOGIN_DISPLAY);
    }
    const handleUserDelete = (id:number) => {
        setTempUsers(prev => prev.filter(usr => usr.id !== id));
    }

    const handleOnLoginScreenOpen = () => {
        setIsLogin(true);
        setSignupError(null);
    }
    const handleOnSignupScreenOpen = () => {
        setIsLogin(false);
        setLoginError(false);
    } 
    const handleOnUserPasswordChange = (id: number, newPass: string) => {
        const newUsers = [...tempUsers];
        const userIndex = newUsers.findIndex(user => user.id === id);
        if(userIndex === -1) return;
        
        newUsers[userIndex].password = newPass;
        setTempUsers(newUsers);
    }
    const handleOnUserNameUpdate = (id: number, newName: string) => {
        const newUsers = [...tempUsers];
        const userIndex = newUsers.findIndex(user => user.id === id);
        if(userIndex === -1) return;
        
        newUsers[userIndex].userName = newName;
        setTempUsers(newUsers);
    }
    return (
        <ProjectsProvider onProjectOpened={handleProjectOpened}>
            <DefaultHeader 
                user={user} 
                onScreenChange={handleDisplayChange}
                currentState={state} 
                onLogout={handleLogout}
                onUserDelete={handleUserDelete}
                onUserPasswordChange={handleOnUserPasswordChange}    
                onUsernameUpdate={handleOnUserNameUpdate}
            />
            <MainScreen 
                state={state}
                loginError={loginError}
                signupError={signupError}
                onLoginAttempt={handleLoginAttempt}
                onSignUpAttempt={handleSignupAttempt} 
                isLogin={isLogin}
                onLoginScreenOpen={handleOnLoginScreenOpen}  
                onSignupScreenOpen={handleOnSignupScreenOpen}
            />
        </ProjectsProvider>
    );
}

export default App;