import { MAIN_STATES, ProjectData, type MainState } from '../../utils/registries';
import ProjectView from './ProjectView';
interface DefaultHeaderProps {
    projects: ProjectData[];
    onScreenChange: (value: MainState) => void;
    currentState: MainState; // new prop to track active screen
}

export const DefaultHeader = ({ projects, onScreenChange, currentState }: DefaultHeaderProps) => {

    return (
        <header className="p-5 bg-[#1a1b26] shadow-lg flex flex-col items-start font-mono">
            <h1 className="text-3xl md:text-4xl font-bold text-purple-400 tracking-wider">
                Noteveil
            </h1>
            <button
                onClick={() => onScreenChange(MAIN_STATES.PROJECTS_DISPLAY)}
                className="
                    mt-3 px-4 py-1 rounded-sm border-2 border-[#7aa2f7]
                  text-[#7aa2f7] font-semibold tracking-wide
                    transition-all duration-150
                  hover:bg-[#7aa2f7] hover:text-[#1a1b26]
                    hover:shadow-[0_0_12px_rgba(122,162,247,0.6)]"
            >
                Projects
            </button>

            {projects.map((project) =>
                <button
                    onClick={() => onScreenChange(MAIN_STATES.TASK_DISPLAY)}
                    key={project.id}
                    className="
                        mt-2 px-4 py-1 w-full text-left
                        rounded-sm border border-[#2a2f47]
                      bg-[#16161e] text-[#c0caf5]
                        font-mono font-semibold tracking-wide
                        transition-all duration-150
                      hover:bg-[#1f2335]
                      hover:border-[#9d7cd8]
                      hover:text-[#bb9af7]
                        hover:shadow-[0_0_10px_rgba(157,124,216,0.35)]"
                >

                    {project.title}
                </button>
            )}
            <ProjectView currentState={currentState} onScreenChange={onScreenChange} />
        </header>
    );
};

export default DefaultHeader;
