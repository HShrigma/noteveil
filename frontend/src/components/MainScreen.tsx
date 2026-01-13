import NotesHolder from "./notes/standalone/NotesHolder";
import TasksHolder from "./tasks/standalone/TasksHolder";
import { MAIN_STATES, type MainState } from '../utils/registries'
import { TaskProvider } from "../context/tasks/TaskProvider";
import { NoteProvider } from "../context/notes/NoteProvider";
import Projects from "./projects/standalone/Projects";
import { useProjectsContext } from "../context/projects/projectsContext";
import {Login} from "./login/Login";
import { UserData } from "../types/userTypes";
import { useState } from "react";

interface MainSreenProps {
    state: MainState;
    onLogin: (value: UserData) => void;
};

export const MainScreen = ({ state, onLogin }: MainSreenProps) => {
    const ctx = useProjectsContext();
    // PlaceHolder validation
    const sampleUser = {id:1, email: "sample@mail.com", password: "123" };
    const [loginError, setLoginError] = useState(false);

    const handleLoginAttempt = ( email:string, password: string) => {
        if (sampleUser.email === email && sampleUser.password === password) { onLogin(sampleUser); return;}
        setLoginError(true);
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
                return (<Login 
                    onLogin={handleLoginAttempt} 
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