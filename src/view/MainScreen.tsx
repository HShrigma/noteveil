import TasksHolder from "./tasks/TasksHolder";
import { MAIN_STATES, type MainState } from './utils/registries'

interface MainSreenProps {
    state: MainState
};

export const MainScreen = ({ state }: MainSreenProps) => {
    const getScreen = () => {
        switch (state) {
            case MAIN_STATES.TASK_DISPLAY:
                return <TasksHolder />
            case MAIN_STATES.NOTES_DISPLAY:
                return <div> Notes Screen (WiP) </div>
            default:
                console.error(`Unknown State${state}`);
                return <div>An Error Occurred</div>
        }
    }
    return (
        <>
            {getScreen()}
        </>);
};
export default MainScreen;