import { useState } from 'react';
import DefaultHeader from './components/header/standalone/Header';
import MainScreen from './components/MainScreen';
import { MAIN_STATES, MainState } from './utils/registries';
import { ProjectsProvider } from './context/projects/ProjectsProvider';
import { useUsers } from './hooks/users/useUsers';

function App() {
    const [state, setState] = useState<MainState>(MAIN_STATES.LOGIN_DISPLAY);

    const users = useUsers(
        () => setState(MAIN_STATES.PROJECTS_DISPLAY),
        () => setState(MAIN_STATES.LOGIN_DISPLAY)
    ); 

    const handleDisplayChange = (value: MainState) => {
        setState(value);
    };

    const handleProjectOpened = (id: number) => {
        handleDisplayChange(MAIN_STATES.TASK_DISPLAY);
    }
    return (
        <ProjectsProvider onProjectOpened={handleProjectOpened}>
            <DefaultHeader 
                user={users.user} 
                onScreenChange={handleDisplayChange}
                currentState={state} 
                onLogout={users.logout}
                onUserDelete={users.deleteUser}
                onUserPasswordChange={users.updatePassword}    
                onUsernameUpdate={users.updateUserName}
            />
            <MainScreen 
                state={state}
                loginError={users.loginError}
                signupError={users.signupError}
                onLoginAttempt={users.login}
                onSignUpAttempt={users.signup} 
                isLogin={users.isLogin}
                onLoginScreenOpen={users.openLoginScreen}  
                onSignupScreenOpen={users.openSignupScreen}
            />
        </ProjectsProvider>
    );
}

export default App;