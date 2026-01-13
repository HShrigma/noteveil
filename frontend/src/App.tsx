import { useState } from 'react';
import DefaultHeader from './components/header/standalone/Header';
import MainScreen from './components/MainScreen';
import { MAIN_STATES, MainState } from './utils/registries';
import { ProjectsProvider } from './context/projects/ProjectsProvider';
import { UserData, UserType } from './types/userTypes';

function App() {
    const [state, setState] = useState<MainState>(MAIN_STATES.LOGIN_DISPLAY);
    const [user, setUser] = useState<UserType>(null);

    const handleDisplayChange = (value: MainState) => {
        setState(value);
    };

    const handleProjectOpened = (id: number) => {
        handleDisplayChange(MAIN_STATES.TASK_DISPLAY);
    }
    const handleLogin = (user: UserData) => {
        setUser(user);
        handleDisplayChange(MAIN_STATES.PROJECTS_DISPLAY);
    }
    const handleLogout= () => {
        setUser(null);
        handleDisplayChange(MAIN_STATES.LOGIN_DISPLAY);
    }
    return (
        <ProjectsProvider onProjectOpened={handleProjectOpened}>
            <DefaultHeader 
                user={user} 
                onScreenChange={handleDisplayChange}
                currentState={state} 
                onLogout={handleLogout}/>
            <MainScreen state={state} onLogin={handleLogin}/>
        </ProjectsProvider>
    );
}

export default App;