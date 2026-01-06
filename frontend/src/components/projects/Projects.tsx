import { useState } from "react";
import { ProjectData } from "../../utils/registries";

export const Projects = () =>{
    const sampleProjects = [{title: "Sample", taskCount: 20, noteCount: 10}];
    const [projects, setProjects] = useState<ProjectData[]>(sampleProjects);
    return (

        projects.map(project => 
           <div>
                {`title: ${project.title}\n`}
                {`tasks: ${project.taskCount}\n`}
                {`notes: ${project.noteCount}\n`}
           </div>
        )
    );
};
export default Projects;