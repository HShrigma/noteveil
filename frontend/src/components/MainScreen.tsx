import NotesHolder from "./notes/standalone/NotesHolder";
import TasksHolder from "./tasks/standalone/TasksHolder";
import { MAIN_STATES, type MainState } from '../utils/registries'
import { TaskProvider } from "../context/tasks/TaskProvider";
import { NoteProvider } from "../context/notes/NoteProvider";
import Projects from "./projects/standalone/Projects";
import { useProjectsContext } from "../context/projects/projectsContext";
import { LoginScreen } from "./login/standalone/LoginScreen";
import { signUpErrorType, signupValidationParams, UserData } from "../types/userTypes";
import { useState } from "react";
import { createTempId } from "../utils/mathUtils";

interface MainSreenProps {
    state: MainState;
    onLogin: (value: UserData) => void;
};

export const MainScreen = ({ state, onLogin }: MainSreenProps) => {
    const ctx = useProjectsContext();
    // PlaceHolder validation
    const sampleUser = { id: 1, userName: "test", email: "sample@mail.com", password: "123" };
    const [tempUsers, setTempUsers] = useState<UserData[]>([sampleUser]);
    const [loginError, setLoginError] = useState(false);
    const [signupError, setSignupError] = useState<signUpErrorType>(null);

    const handleLoginAttempt = (email: string, password: string) => {
        const foundUser = tempUsers.find(user => user.email === email && user.password === password);
        if (foundUser) {
            setLoginError(false);
            onLogin(foundUser);
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
            onLogin(newUser);
        }

        setSignupError(err);
    }

    const getScreen = () => {
        switch (state) {
            case MAIN_STATES.TASK_DISPLAY:
                return (
                    <TaskProvider
                        key={ctx.activeProject.id ?? "no-project"}
                        activeProjectId={ctx.activeProject.id}>
                        <TasksHolder />
                    </TaskProvider>);
            case MAIN_STATES.NOTES_DISPLAY:
                return (
                    <NoteProvider
                        key={ctx.activeProject.id ?? "no-project"}
                        activeProjectId={ctx.activeProject.id}>
                        <NotesHolder />
                    </NoteProvider>
                );
            case MAIN_STATES.PROJECTS_DISPLAY:
                return (<Projects />);
            case MAIN_STATES.LOGIN_DISPLAY:
                return (<LoginScreen
                    onLogin={handleLoginAttempt}
                    onSignup={handleSignupAttempt}
                    loginError={loginError}
                    signupError={signupError} />);
            default:
                console.error(`Unknown State: ${state}`);
                return <div>An Error Occurred</div>
        }
    }
    return (
        <div className="p-6 bg-[#16161e] min-h-[calc(100vh-5rem)] overflow-auto">
            {getScreen()}
        </div>);
};
export default MainScreen;