import { useState } from 'react';
import DefaultHeader from './components/header/Header';
import MainScreen from './components/MainScreen';
import { MAIN_STATES, ProjectData, type MainState } from './utils/registries';

function App() {
    const [state, setState] = useState<MainState>(MAIN_STATES.PROJECTS_DISPLAY);

    const sampleProjects = [
        { id: 1, title: "Sample", taskCount: 20, noteCount: 10 },
        { id: 2, title: "Sample 2", taskCount: 20, noteCount: 10 },
    ];
    const [projects, setProjects] = useState<ProjectData[]>(sampleProjects);

    const handleDisplayChange = (value: MainState) => {
        setState(value);
    };
    const handleProjectSelect = (state: MainState, id: number) => {
        handleDisplayChange(state);
    }
    return (
        <>
            <DefaultHeader onScreenChange={handleDisplayChange} currentState={state} projects={projects} />
            <MainScreen state={state} onProjectSelect={handleProjectSelect} projects={projects} />
        </>
    );
}

export default App;
