import { ReactNode } from "react";
import { ProjectsContext } from "../../utils/projects/projectsContext";
import { useProjects } from "../../utils/projects/useProjects";

export function ProjectsProvider({ children, onProjectOpened }: { children: ReactNode, onProjectOpened: (id:number) => void }) {
    const ctx = useProjects(onProjectOpened);
    return (
        <ProjectsContext.Provider value={ctx} >
            {children}
        </ProjectsContext.Provider>
    );
}