import NotesHolder from "./notes/standalone/NotesHolder";
import TasksHolder from "./tasks/standalone/TasksHolder";
import { MAIN_STATES, type MainState } from '../utils/registries'
import { TaskProvider } from "./tasks/TaskProvider";
import { NoteProvider } from "./notes/NoteProvider";
import Projects from "./projects/Projects";

interface MainSreenProps {
    state: MainState
    onProjectSelect: (state: MainState, id: number) => void;
};

export const MainScreen = ({ state, onProjectSelect }: MainSreenProps) => {
    const getProject = (state: MainState, id: number) => {
        onProjectSelect(state, id);
    };

    const getScreen = () => {
        switch (state) {
            case MAIN_STATES.TASK_DISPLAY:
                return <TaskProvider>
                    <TasksHolder />
                </TaskProvider>
            case MAIN_STATES.NOTES_DISPLAY:
                return <NoteProvider> <NotesHolder /> </NoteProvider>
            case MAIN_STATES.PROJECTS_DISPLAY:
                return <Projects onProjectChange={getProject} />
            default:
                console.error(`Unknown State${state}`);
                return <div>An Error Occurred</div>
        }
    }
    return (
        <div className="p-6 bg-[#16161e] min-h-[calc(100vh-5rem)] overflow-auto">
            {getScreen()}
        </div>);
};
export default MainScreen;