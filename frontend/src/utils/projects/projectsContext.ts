import { createContext, useContext } from "react";
import { ProjectsContextResult } from "./projectTypes";

export const ProjectsContext = createContext<ProjectsContextResult | null>(null);

export function useProjectsContext() {
    const context = useContext(ProjectsContext);
    if (!context) { throw new Error("useProjectsContext must be used within a ProjectsProvider"); }
    return context;
}
