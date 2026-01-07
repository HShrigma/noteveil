import {ProjectData } from "../../utils/registries";
import Project from "./Project";

export interface ProjectsProps {
    projects: ProjectData[];
    onProjectChange: (id: number) => void;
    onProjectDelete: (id: number) => void;
}

export const Projects = ({ projects, onProjectChange, onProjectDelete }: ProjectsProps) => {
    const changeProject = (id: number) =>
        onProjectChange(id);

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
                <Project
                    project={project}
                    onProjectChange={onProjectChange}
                    onProjectDelete={onProjectDelete} />)
            )}
        </div>
    );
};

export default Projects;