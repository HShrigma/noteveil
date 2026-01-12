import NotesHolder from "./notes/standalone/NotesHolder";
import TasksHolder from "./tasks/standalone/TasksHolder";
import { MAIN_STATES, type MainState } from '../utils/registries'
import { TaskProvider } from "../context/tasks/TaskProvider";
import { NoteProvider } from "../context/notes/NoteProvider";
import Projects from "./projects/standalone/Projects";
import { useProjectsContext } from "../context/projects/projectsContext";
import {Login} from "./login/Login";

interface MainSreenProps {
    state: MainState;
};

export const MainScreen = ({ state }: MainSreenProps) => {
    const ctx = useProjectsContext();
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
                return (<Login/>);
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