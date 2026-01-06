import { useState } from "react";
import { MAIN_STATES, MainState, ProjectData } from "../../utils/registries";

export interface ProjectsProps
{ 
    projects: ProjectData[];
    onProjectChange: (state: MainState, id: number) => void;
}

export const Projects = ({projects, onProjectChange}:ProjectsProps) =>{
    
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