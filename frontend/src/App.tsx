import { useState } from 'react';
import DefaultHeader from './components/header/Header';
import MainScreen from './components/MainScreen';
import { MAIN_STATES, MainState } from './utils/registries';
import { ProjectsProvider } from './components/projects/ProjectsProvider';

function App() {
    const [state, setState] = useState<MainState>(MAIN_STATES.PROJECTS_DISPLAY);
    const [activeProjectId, setActiveProjectId] = useState<number>(0);
    const handleDisplayChange = (value: MainState) => {
        setState(value);
    };

    const handleProjectOpened = (id: number) => {
        handleDisplayChange(MAIN_STATES.TASK_DISPLAY);
        setActiveProjectId(id);
    }

    return (
        <ProjectsProvider onProjectOpened={handleProjectOpened}>
            <DefaultHeader onScreenChange={handleDisplayChange} currentState={state} />
            <MainScreen state={state} activeProjectId={activeProjectId} />
        </ProjectsProvider>
    );
}

export default App;