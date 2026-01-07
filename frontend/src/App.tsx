import { useState } from 'react';
import DefaultHeader from './components/header/Header';
import MainScreen from './components/MainScreen';
import { discardMsgProjectTitle, MAIN_STATES, ProjectActivity, ProjectData, type MainState } from './utils/registries';
import { triggerScreenBob } from './utils/screenShake';

function App() {
    const [state, setState] = useState<MainState>(MAIN_STATES.PROJECTS_DISPLAY);

    const sampleProjects = [
        { id: 1, title: "Sample", taskCount: 20, noteCount: 10 },
        { id: 2, title: "Sample 2", taskCount: 20, noteCount: 10 },
    ];
    const [projects, setProjects] = useState<ProjectData[]>(sampleProjects);
    const [activeProject, setActiveProject] = useState<ProjectActivity>({ id: null });
    const [activeProjectElement, setActiveProjectElement] = useState<ProjectActivity>({ id: null });

    const handleDisplayChange = (value: MainState) => {
        setState(value);
    };
    const handleProjectSelect = (id: number | null) => {
        if(activeProjectElement.id !== null && !window.confirm(discardMsgProjectTitle)) return;
        if (id !== null){
            handleDisplayChange(MAIN_STATES.TASK_DISPLAY);
            setActiveProjectElement({id:null});
        } 
        setActiveProject({ id });
        triggerScreenBob(150);
    }
    const deleteProject = (id: number) => {
        setProjects(prev => prev.filter(project => project.id !== id));
    }
    const handleTitleSubmit = (id: number, value: string) => 
    {
        const newProject = [...projects].find(proj => proj.id === id);
        if(!newProject) return;

        newProject.title = value;
        setProjects(prev => prev.map( project => project.id === id ? newProject : project));
        setActiveProjectElement({id:null});
    };
    const handleActivityRequest = (id: number, wantsActive: boolean, value: string) => { 
        const index = [...projects].findIndex(proj => proj.id === id);
        if(index === -1) return;
        if(!wantsActive) {
            console.log("Doesn't want active!");
            setActiveProjectElement({id:null});
            return;
        }
        setActiveProjectElement({id});
    };
    return (
        <>
            <DefaultHeader
                activeProject={activeProject}
                onProjectSelect={handleProjectSelect}
                onScreenChange={handleDisplayChange}
                currentState={state}
                projects={projects} />
            <MainScreen
                state={state}
                onProjectSelect={handleProjectSelect}
                projects={projects}
                activeProjectElement={activeProjectElement}
                onProjectDelete={deleteProject}
                onProjectActivityElementRequest={handleActivityRequest}
                onProjectTitleSubmit={handleTitleSubmit} />
        </>
    );
}

export default App;