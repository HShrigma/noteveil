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
            >
            Projects   
            </button>

            {projects.map((project) =>
                <button
                    onClick={() => onScreenChange(MAIN_STATES.TASK_DISPLAY)}
                    key={project.id}>
                    {project.title}
                </button>
            )}
            <ProjectView currentState={currentState} onScreenChange={onScreenChange} />
        </header>
    );
};

export default DefaultHeader;
