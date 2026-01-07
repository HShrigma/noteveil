import { ProjectActivity, ProjectData } from "../../utils/registries";
import Project from "./Project";
import ProjectAdder from "./ProjectAdder";

export interface ProjectsProps {
    projects: ProjectData[];
    activeProjectElement: ProjectActivity;
    onProjectChange: (id: number) => void;
    onProjectDelete: (id: number) => void;
    onTitleSubmit: (id: number, value: string) => void;
    onProjectAdded: (value:string) => void;
    onActivityRequest: (id: number, wantsActive: boolean, value: string) => void;
}

export const Projects = ({ projects, activeProjectElement, onProjectChange, onProjectDelete, onActivityRequest, onTitleSubmit, onProjectAdded }: ProjectsProps) => {
    const changeProject = (id: number) =>
        onProjectChange(id);

    return (
        <>
            <ProjectAdder 
            isActive={activeProjectElement.id === -1} 
            onActivityRequest={onActivityRequest} 
            onProjectAdded={onProjectAdded}/>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map(project => (
                    <Project
                        key={project.id}
                        project={project}
                        activeProjectElement={activeProjectElement}
                        onProjectChange={onProjectChange}
                        onProjectDelete={onProjectDelete} 
                        onTitleSubmit={onTitleSubmit}
                        onActivityRequest={onActivityRequest} />)
                )}
            </div>
        </>
    );
};

export default Projects;