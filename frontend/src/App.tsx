import { useState } from 'react';
import DefaultHeader from './components/header/Header';
import MainScreen from './components/MainScreen';
import { MAIN_STATES, ProjectActivity, ProjectData, type MainState } from './utils/registries';

function App() {
    const [state, setState] = useState<MainState>(MAIN_STATES.PROJECTS_DISPLAY);

    const sampleProjects = [
        { id: 1, title: "Sample", taskCount: 20, noteCount: 10 },
        { id: 2, title: "Sample 2", taskCount: 20, noteCount: 10 },
    ];
    const [projects, setProjects] = useState<ProjectData[]>(sampleProjects);
    const [activeProject, setActiveProject] = useState<ProjectActivity>({ id: null });

    const handleDisplayChange = (value: MainState) => {
        setState(value);
    };
    const handleProjectSelect = (id: number) => {
        handleDisplayChange(MAIN_STATES.TASK_DISPLAY);
        setActiveProject({id});
    }
    return (
        <>
            <DefaultHeader activeProject={activeProject} onProjectSelect={handleProjectSelect} onScreenChange={handleDisplayChange} currentState={state} projects={projects} />
            <MainScreen state={state} onProjectSelect={handleProjectSelect} projects={projects} />
        </>
    );
}

export default App;
