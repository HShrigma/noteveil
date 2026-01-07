import { ProjectData, ProjectElementActivity } from "../../utils/registries";
import Project from "./Project";
import ProjectAdder from "./ProjectAdder";

export interface ProjectsProps {
    projects: ProjectData[];
    activeProjectElement: ProjectElementActivity;
    onProjectChange: (id: number) => void;
    onProjectDelete: (id: number) => void;
    onTitleSubmit: (id: number, value: string) => void;
    onProjectAdded: (value:string) => void;
    onActivityRequest: (req:ProjectElementActivity) => void;
}

export const Projects = ({ projects, activeProjectElement, onProjectChange, onProjectDelete, onActivityRequest, onTitleSubmit, onProjectAdded }: ProjectsProps) => {
    const buildTitleActivityRequest = (id: number, wantsActive: boolean, value: string) => onActivityRequest(wantsActive ? {id:id, type:"title", value:value} : null);
    const buildAdderActivityRequest = (wantsActive: boolean, value: string) => onActivityRequest(wantsActive ? {type:"adder", value:value} : null);

    return (
        <>
            <ProjectAdder 
                isActive={activeProjectElement !== null && activeProjectElement.type === "adder"} 
                onActivityRequest={buildAdderActivityRequest} 
                onProjectAdded={onProjectAdded} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map(project => (
                    <Project
                        key={project.id}
                        project={project}
                        activeProjectElement={activeProjectElement}
                        onProjectChange={onProjectChange}
                        onProjectDelete={onProjectDelete} 
                        onTitleSubmit={onTitleSubmit}
                        onActivityRequest={buildTitleActivityRequest} />)
                )}
            </div>
        </>
    );
};

export default Projects;