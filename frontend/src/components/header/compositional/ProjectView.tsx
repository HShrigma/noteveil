import { MAIN_STATES, MainState } from "../../../utils/registries";

export interface ProjectViewProps {
    currentState: MainState;
    onScreenChange?: (value: MainState) => void;
};
export const ProjectView = ({ currentState, onScreenChange }: ProjectViewProps) => {

    const baseButtonClass = `
    py-1 px-4 py-1 rounded-sm border-2  fade-in
    font-mono font-semibold transition-all duration-150
  `;

    const getButtonClass = (isActive: boolean) =>
        `${baseButtonClass} ${isActive
            ? 'bg-red-500  text-[#1f2335]  rounded-xl  shadow-[0_0_12px_#f7768e] border-red-500 '
            : 'bg-transparent text-red-400 rounded-xl shadow-md hover:bg-red-400 hover:text-red-200 hover:shadow-[0_0_12px_#f7768e] border-red-500 cursor-pointer'
        }`;

    const handleClick = (value: MainState) => onScreenChange?.(value);
    return (
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
};

export default ProjectView;