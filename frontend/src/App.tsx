import { useState } from 'react';
import DefaultHeader from './components/header/standalone/Header';
import MainScreen from './components/MainScreen';
import { MAIN_STATES, MainState } from './utils/registries';
import { ProjectsProvider } from './context/projects/ProjectsProvider';
import { UserProvider } from './context/users/UserProvider';

function App() {
    const [state, setState] = useState<MainState>(MAIN_STATES.LOGIN_DISPLAY);

    const handleLoginSuccess = () => setState(MAIN_STATES.PROJECTS_DISPLAY);
    const handleLogoutSuccess = () => setState(MAIN_STATES.LOGIN_DISPLAY);
    const handleDisplayChange = (value: MainState) => {
        setState(value);
    };

    const handleProjectOpened = (id: number) => {
        handleDisplayChange(MAIN_STATES.TASK_DISPLAY);
    }
    return (
        <UserProvider onLoginSuccess={handleLoginSuccess} onLogoutSuccess={handleLogoutSuccess}>
            <ProjectsProvider onProjectOpened={handleProjectOpened}>
                <DefaultHeader onScreenChange={handleDisplayChange} currentState={state} />
                <MainScreen state={state} />
            </ProjectsProvider>
        </UserProvider>
    );
}

export default App;