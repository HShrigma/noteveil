import { ReactNode } from "react";
import { ProjectsContext } from "./projectsContext";
import { useProjects } from "../../hooks/projects/useProjects";
import { UserType } from "../../types/userTypes";

export function ProjectsProvider({ children, user, onProjectOpened }: { children: ReactNode, user: UserType, onProjectOpened: (id: number) => void }) {
    const ctx = useProjects(user, onProjectOpened);
    return (
        <ProjectsContext.Provider value={ctx} >
            {children}
        </ProjectsContext.Provider>
    );
}