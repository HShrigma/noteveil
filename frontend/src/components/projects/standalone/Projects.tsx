import { useProjectsContext } from "../../../context/projects/projectsContext";
import Project from "./Project";
import ProjectAdder from "../compositional/ProjectAdder";

export const Projects = () => {
    const ctx = useProjectsContext();

    return (
        <>
            <ProjectAdder 
                isActive={ctx.isAdderActive()} 
                onActivityRequest={ctx.buildAdderActivityRequest} 
                onProjectAdded={ctx.addProject} />
            <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                {ctx.projects.map(project => (<Project key={project.id} project={project} />))}
            </div>
        </>
    );
};

export default Projects;