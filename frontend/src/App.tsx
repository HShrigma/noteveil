import { useState } from 'react';
import { MAIN_STATES, MainState } from './utils/registries';
import { UserProvider } from './context/users/UserProvider';
import { AppWithUser } from './components/AppWithUser';

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
            <AppWithUser 
                state={state}
                onProjectOpened={handleProjectOpened}
                onScreenChange={handleDisplayChange}
            />
        </UserProvider>
    );
}

export default App;