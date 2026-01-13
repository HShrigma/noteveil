import { useState } from 'react';
import DefaultHeader from './components/header/standalone/Header';
import MainScreen from './components/MainScreen';
import { MAIN_STATES, MainState } from './utils/registries';
import { ProjectsProvider } from './context/projects/ProjectsProvider';
import { UserData, UserType } from './types/userTypes';

function App() {
    const [state, setState] = useState<MainState>(MAIN_STATES.PROJECTS_DISPLAY);
    const [user, setUser] = useState<UserType>(null);

    const handleDisplayChange = (value: MainState) => {
        setState(value);
    };

    const handleProjectOpened = (id: number) => {
        handleDisplayChange(MAIN_STATES.TASK_DISPLAY);
    }
    const handleOnLogin = (user: UserData) => {
        handleDisplayChange(MAIN_STATES.PROJECTS_DISPLAY);
    }
    return (
        <ProjectsProvider onProjectOpened={handleProjectOpened}>
            <DefaultHeader onScreenChange={handleDisplayChange} currentState={state} />
            <MainScreen state={state} onLogin={handleOnLogin}/>
        </ProjectsProvider>
    );
}

export default App;