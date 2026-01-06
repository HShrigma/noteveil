import { useState } from "react";
import { MAIN_STATES, MainState, ProjectData } from "../../utils/registries";

export interface ProjectsProps
{ 
    onProjectChange: (state: MainState, id: number) => void;
}

export const Projects = ({onProjectChange}:ProjectsProps) =>{
    const sampleProjects = [{id: 1, title: "Sample", taskCount: 20, noteCount: 10}];
    const [projects, setProjects] = useState<ProjectData[]>(sampleProjects);
    
    const changeProject = (id: number,) => onProjectChange(MAIN_STATES.TASK_DISPLAY, id);

    return (
        projects.map(project => 
           <div
                key={project.id}
                onClick={() => changeProject(project.id)}
           >
                {`title: ${project.title}`}
                <br/>
                {`tasks: ${project.taskCount}`}
                <br/>
                {`notes: ${project.noteCount}`}
           </div>
        )
    );
};
export default Projects;