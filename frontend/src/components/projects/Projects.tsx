import { MAIN_STATES, MainState, ProjectData } from "../../utils/registries";

export interface ProjectsProps {
    projects: ProjectData[];
    onProjectChange: (state: MainState, id: number) => void;
}

export const Projects = ({ projects, onProjectChange }: ProjectsProps) => {
    const changeProject = (id: number) =>
        onProjectChange(MAIN_STATES.TASK_DISPLAY, id);

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
                <div
                    key={project.id}
                    onClick={() => changeProject(project.id)}
                    className="
                        cursor-pointer p-5 rounded-md
                      bg-[#1f2335] border-2 border-[#2a2f47]
                        shadow-md shadow-black/30
                        font-mono transition-all duration-200
                      hover:bg-[#24283b]
                        hover:shadow-[0_0_18px_rgba(122,162,247,0.25)]
                        hover:-translate-y-1
                        active:translate-y-0"
                >
                    <h2 className="text-lg font-bold tracking-wide text-[#c0caf5]">
                        {project.title}
                    </h2>

                    <div className="mt-2 text-sm text-[#9aa5ce] space-y-1">
                        <div>
                            <span className="text-[#7aa2f7]">Tasks:</span>{" "}
                            {project.taskCount}
                        </div>
                        <div>
                            <span className="text-[#bb9af7]">Notes:</span>{" "}
                            {project.noteCount}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Projects;