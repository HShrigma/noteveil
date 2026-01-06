import { MAIN_STATES, ProjectData, type MainState } from '../utils/registries';
interface DefaultHeaderProps {
    projects: ProjectData[];
    onScreenChange: (value: MainState) => void;
    currentState: MainState; // new prop to track active screen
}

export const DefaultHeader = ({ projects, onScreenChange, currentState }: DefaultHeaderProps) => {
    const handleClick = (value: MainState) => onScreenChange?.(value);

    const baseButtonClass = `
    px-6 py-1 rounded-sm border-2 border-red-500 
    font-mono font-semibold transition-all duration-150
  `;

    const getButtonClass = (isActive: boolean) =>
        `${baseButtonClass} ${isActive
            ? 'bg-red-800 text-gray-200 py-2 rounded-xl shadow-lg shadow-[0_0_16px_#f7768e]'
            : 'bg-transparent text-red-400 rounded-xl shadow-md hover:bg-red-400 hover:text-red-200 hover:shadow-[0_0_12px_#f7768e]'
        }`;

    const ProjectFilter = () => (
        <nav className="flex gap-3 mt-3">
            <button
                className={getButtonClass(currentState === MAIN_STATES.TASK_DISPLAY)}
                onClick={() => handleClick(MAIN_STATES.TASK_DISPLAY)}
            >
                Tasks
            </button>
            <button
                className={getButtonClass(currentState === MAIN_STATES.NOTES_DISPLAY)}
                onClick={() => handleClick(MAIN_STATES.NOTES_DISPLAY)}
            >
                Notes
            </button>
        </nav>
    );

    return (
        <header className="p-5 bg-[#1a1b26] shadow-lg flex flex-col items-start font-mono">
            <h1 className="text-3xl md:text-4xl font-bold text-purple-400 tracking-wider">
                Noteveil
            </h1>
            <button
                onClick={() => handleClick(MAIN_STATES.PROJECTS_DISPLAY)}
                className={getButtonClass(currentState === MAIN_STATES.PROJECTS_DISPLAY)}
            >
            Projects   
            </button>

            {projects.map((project) =>
                <button
                    onClick={() => handleClick(MAIN_STATES.PROJECTS_DISPLAY)}
                    className={getButtonClass(project.id === 1)}
                    key={project.id}>
                    {project.title}
                </button>
            )}
            <ProjectFilter />
        </header>
    );
};

export default DefaultHeader;
