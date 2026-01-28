import { useEffect } from "react";
import { ProjectsProvider } from "../context/projects/ProjectsProvider";
import { useUserContext } from "../context/users/userContext";
import { MainState } from "../utils/registries";
import DefaultHeader from "./header/standalone/Header";
import MainScreen from "./MainScreen";
import FullScreenLoader from "./FullScreenLoader";

interface AppWithUserProps{
    state: MainState;
    onProjectOpened: (id: number) => void;
    onScreenChange: (value: MainState) => void;
}
export const AppWithUser = ({ state, onProjectOpened, onScreenChange }: AppWithUserProps) => {
    const ctx = useUserContext();
    useEffect( () => { ctx.initializeUser().then() }, []);

    if (ctx.initializing) {
        return <FullScreenLoader />;
    }

    return (
        <ProjectsProvider onProjectOpened={onProjectOpened}>
                <DefaultHeader onScreenChange={onScreenChange} currentState={state} />
                <MainScreen state={state} />
        </ProjectsProvider>
    );
}