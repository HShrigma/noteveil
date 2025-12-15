import NotesHolder from "./notes/NotesHolder";
import TasksHolder from "./tasks/standalone/TasksHolder";
import { MAIN_STATES, type MainState } from '../utils/registries'
import { TaskProvider } from "./tasks/TaskProvider";

interface MainSreenProps {
    state: MainState
};

export const MainScreen = ({ state }: MainSreenProps) => {
    const getScreen = () => {
        switch (state) {
            case MAIN_STATES.TASK_DISPLAY:
                return <TaskProvider>
                    <TasksHolder />
                    </TaskProvider>
            case MAIN_STATES.NOTES_DISPLAY:
                return <NotesHolder />
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