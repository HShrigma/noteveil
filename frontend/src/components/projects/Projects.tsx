import { ProjectActivity, ProjectData } from "../../utils/registries";
import Project from "./Project";

export interface ProjectsProps {
    projects: ProjectData[];
    activeProjectElement: ProjectActivity;
    onProjectChange: (id: number) => void;
    onProjectDelete: (id: number) => void;
    onTitleSubmit: (id: number, value: string) => void;
    onActivityRequest: (id: number, wantsActive: boolean, value: string) => void;
}

export const Projects = ({ projects, onProjectChange, onProjectDelete, onActivityRequest, onTitleSubmit, activeProjectElement }: ProjectsProps) => {
    const changeProject = (id: number) =>
        onProjectChange(id);

    return (
        <>
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