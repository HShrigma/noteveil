import NotesHolder from "./notes/standalone/NotesHolder";
import TasksHolder from "./tasks/standalone/TasksHolder";
import { MAIN_STATES, type MainState } from '../utils/registries'
import { TaskProvider } from "../context/tasks/TaskProvider";
import { NoteProvider } from "../context/notes/NoteProvider";
import Projects from "./projects/standalone/Projects";
import { useProjectsContext } from "../context/projects/projectsContext";
import {LoginScreen} from "./login/standalone/LoginScreen";
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
    const sampleUser = {id:1, userName:"test", email: "sample@mail.com", password: "123" };
    const [tempUsers, setTempUsers] = useState<UserData[]>([sampleUser]);
    const [loginError, setLoginError] = useState(false);
    const [signupError, setSignupError] = useState<signUpErrorType>(null);

    const handleLoginAttempt = ( email:string, password: string) => {
        const foundUser = tempUsers.find(user => user.email === email && user.password === password);
        if (foundUser) { 
            setLoginError(false);
            onLogin(foundUser);
            return;
        }
        setLoginError(true);
    }

    const handleSignupAttempt = ( email:string, userName: string, password: string) => {
        const err = null;
        if(err === null) {
            const newUser = {id: createTempId(), email, userName, password};
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
                    loginError={loginError}/>);
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