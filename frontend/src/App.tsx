import { useState } from 'react';
import DefaultHeader from './components/header/Header';
import MainScreen from './components/MainScreen';
import { useProjects } from './utils/projects/useProjects';
import { MAIN_STATES, MainState } from './utils/registries';

function App() {
    const [state, setState] = useState<MainState>(MAIN_STATES.PROJECTS_DISPLAY);

    const {
        projects,
        activeProject,
        activeProjectElement,
        selectProject,
        addProject,
        deleteProject,
        submitProjectTitle,
        requestProjectElementActivity,
    } = useProjects(() => {
        setState(MAIN_STATES.TASK_DISPLAY);
    });
    const handleDisplayChange = (value: MainState) => {
        setState(value);
    };

return (
    <>
        <DefaultHeader
            activeProject={activeProject}
            onProjectSelect={selectProject}
            onScreenChange={handleDisplayChange}
            currentState={state}
            projects={projects} />
        <MainScreen
            state={state}
            onProjectAdded={addProject}
            onProjectSelect={selectProject}
            projects={projects}
            activeProjectElement={activeProjectElement}
            onProjectDelete={deleteProject}
            onProjectActivityElementRequest={requestProjectElementActivity}
            onProjectTitleSubmit={submitProjectTitle} />
    </>
);
}

export default App;