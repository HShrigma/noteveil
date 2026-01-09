import { useState } from 'react';
import DefaultHeader from './components/header/Header';
import MainScreen from './components/MainScreen';
import { MAIN_STATES, MainState } from './utils/registries';
import { ProjectsProvider } from './components/projects/ProjectsProvider';

function App() {
    const [state, setState] = useState<MainState>(MAIN_STATES.PROJECTS_DISPLAY);
    const handleDisplayChange = (value: MainState) => {
        setState(value);
    };

    const handleProjectOpened = (id: number) => {
        console.log("PROJECT OPENED");
        handleDisplayChange(MAIN_STATES.TASK_DISPLAY);
    }

    return (
        <ProjectsProvider onProjectOpened={handleProjectOpened}>
            <DefaultHeader onScreenChange={handleDisplayChange} currentState={state} />
            <MainScreen state={state}/>
        </ProjectsProvider>
    );
}

export default App;