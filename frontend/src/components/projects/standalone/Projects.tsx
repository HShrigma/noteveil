import { useProjectsContext } from "../../../utils/projects/projectsContext";
import Project from "./compositional/Project";
import ProjectAdder from "./compositional/ProjectAdder";

export const Projects = () => {
    const ctx = useProjectsContext();

    return (
        <>
            <ProjectAdder 
                isActive={ctx.isAdderActive()} 
                onActivityRequest={ctx.buildAdderActivityRequest} 
                onProjectAdded={ctx.addProject} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {ctx.projects.map(project => (<Project key={project.id} project={project} />))}
            </div>
        </>
    );
};

export default Projects;