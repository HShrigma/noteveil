import { useState } from 'react';
import DefaultHeader from './components/header/Header';
import MainScreen from './components/MainScreen';
import { discardMsgProjectAdder, discardMsgProjectTitle, MAIN_STATES, type MainState } from './utils/registries';
import { triggerScreenBob } from './utils/screenShake';
import { createTempId } from './utils/mathUtils';
import { tryCancelDiscard } from './utils/activityHelper';
import { ProjectActivity, ProjectData, ProjectElementActivity } from './utils/projects/projectTypes';

function App() {
    const [state, setState] = useState<MainState>(MAIN_STATES.PROJECTS_DISPLAY);

    const sampleProjects = [
        { id: 1, title: "Sample", taskCount: 20, noteCount: 10 },
        { id: 2, title: "Sample 2", taskCount: 20, noteCount: 10 },
    ];
    const [projects, setProjects] = useState<ProjectData[]>(sampleProjects);
    const [activeProject, setActiveProject] = useState<ProjectActivity>({ id: null });
    const [activeProjectElement, setActiveProjectElement] = useState<ProjectElementActivity>(null);

    const handleDisplayChange = (value: MainState) => {
        setState(value);
    };
    const handleProjectSelect = (id: number | null) => {

        if (tryCancelDiscard(activeProjectElement !== null, activeProjectElement?.type === "title" ? discardMsgProjectTitle : discardMsgProjectAdder)) return;
        if (id !== null) {
            handleDisplayChange(MAIN_STATES.TASK_DISPLAY);
            setActiveProjectElement(null);
        }
        setActiveProject({ id });
        triggerScreenBob(150);
    }
    const deleteProject = (id: number) => {
        setProjects(prev => prev.filter(project => project.id !== id));
    }
    const handleTitleSubmit = (id: number, value: string) => {
        const newProject = [...projects].find(proj => proj.id === id);
        if (!newProject) return;

        newProject.title = value;
        setProjects(prev => prev.map(project => project.id === id ? newProject : project));
        setActiveProjectElement(null);
    };
    const handleActivityRequest = (req: ProjectElementActivity) => {
        if (req === null) { setActiveProjectElement(null); return; }
        if (activeProjectElement === null) { setActiveProjectElement(req); return; }

        if (req.type !== activeProjectElement?.type) {
            if (activeProjectElement.type === "adder") {
                if (tryCancelDiscard(activeProjectElement.value !== "", discardMsgProjectAdder)) return;
                setActiveProjectElement(req);
                return;
            }

            if (activeProjectElement.type === "title") {
                const index = [...projects].findIndex(proj => proj.id === activeProjectElement.id);
                if (index === -1) return;
                const proj = projects[index];
                if (tryCancelDiscard(activeProjectElement.value !== proj.title, discardMsgProjectTitle)) return;
                setActiveProjectElement(req);
                return;
            }
        }
        setActiveProjectElement(req);
    }

const handleProjectAdded = (value: string) => {
    const newId = createTempId();
    const newProject: ProjectData = {
        id: newId,
        title: value,
        taskCount: 0,
        noteCount: 0
    }

    setProjects(prev => [...prev, newProject]);
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
            onProjectAdded={handleProjectAdded}
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