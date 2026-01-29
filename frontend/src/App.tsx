import { useState } from 'react';
import { MAIN_STATES } from './utils/registries';
import type { MainState } from './utils/registries';
import { UserProvider } from './context/users/UserProvider';
import { AppWithUser } from './components/AppWithUser';
import { GoogleOAuthProvider} from "@react-oauth/google";

function App() {
    const [state, setState] = useState<MainState>(MAIN_STATES.LOGIN_DISPLAY);

    const handleLoginSuccess = () => setState(MAIN_STATES.PROJECTS_DISPLAY);
    const handleLogoutSuccess = () => setState(MAIN_STATES.LOGIN_DISPLAY);
    const handleDisplayChange = (value: MainState) => {
        setState(value);
    };

    const handleProjectOpened = () => {
        handleDisplayChange(MAIN_STATES.TASK_DISPLAY);
    }

    return (
        <UserProvider onLoginSuccess={handleLoginSuccess} onLogoutSuccess={handleLogoutSuccess}>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} >
                <AppWithUser
                    state={state}
                    onProjectOpened={handleProjectOpened}
                    onScreenChange={handleDisplayChange}
                />
            </GoogleOAuthProvider>
        </UserProvider>
    );
}

export default App;