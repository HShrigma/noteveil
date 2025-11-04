import { useState } from "react";
import TasksHolder from "./tasks/TasksHolder";
import { MAIN_STATES, type MainState } from './utils/registries'

interface MainSreenProps {
    state: MainState
};

export const MainScreen = ({ state }: MainSreenProps) => {
    const [currentState, setCurrentState] = useState(state);
    const getScreen = () => {
        switch (currentState) {
            case MAIN_STATES.TASK_DISPLAY:
                return <TasksHolder />
            case MAIN_STATES.NOTES_DISPLAY:
                return <div> Notes Screen (WiP) </div>
            default:
                console.error(`Unknown State${currentState}`);
                return <div>An Error Occurred</div>
        }
    }
    return (
        <>
            {getScreen()}
        </>);
};
export default MainScreen;