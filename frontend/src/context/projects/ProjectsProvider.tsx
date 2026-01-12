import { ReactNode } from "react";
import { ProjectsContext } from "./projectsContext";
import { useProjects } from "../../hooks/projects/useProjects";

export function ProjectsProvider({ children, onProjectOpened }: { children: ReactNode, onProjectOpened: (id:number) => void }) {
    const ctx = useProjects(onProjectOpened);
    return (
        <ProjectsContext.Provider value={ctx} >
            {children}
        </ProjectsContext.Provider>
    );
}