import { useProjectsContext } from '../../../context/projects/projectsContext';
import { useUserContext } from '../../../context/users/userContext';
import { getShorter } from '../../../utils/formatting';
import { logoutMsg, MAIN_STATES, type MainState } from '../../../utils/registries';
import HeaderTop from '../compositional/HeaderTop';
import ProjectView from '../compositional/ProjectView';
interface DefaultHeaderProps {
    onScreenChange: (value: MainState) => void;
    currentState: MainState;
}

export const DefaultHeader = ({ currentState, onScreenChange, }: DefaultHeaderProps) => {
    const userCtx = useUserContext();
    const projectCtx = useProjectsContext();
    const goToProjectsScreen = () => {
        if (currentState !== MAIN_STATES.PROJECTS_DISPLAY) {
            onScreenChange(MAIN_STATES.PROJECTS_DISPLAY);
            projectCtx.selectProject(null);
        }
    }
    const handleLogout = (withMessage?: boolean) => {
        if (!withMessage) userCtx.logout();
        if (withMessage && window.confirm(logoutMsg)) userCtx.logout();
    }
    return (
        <header className="p-5 bg-[#1a1b26] border-b border-[#2a2f47] shadow-lg font-mono">
            {/* Header top section */}
            <HeaderTop onLogout={handleLogout} />
            {/* Projects row */}
            {userCtx.user !== null &&
                <div className="mt-4 flex items-center gap-3 ">
                    {/* Projects home button */}
                    <button
                        onClick={() => goToProjectsScreen()}
                        className={
                            currentState === MAIN_STATES.PROJECTS_DISPLAY ?
                                `px-4 py-1 rounded-sm border-2
                      bg-[#7aa2f7]
                      text-[#1a1b26]
                        fade-in
                        font-semibold tracking-wide
                        `
                                :
                                `flex-shrink-0 px-4 py-1 rounded-sm border-2 border-[#7aa2f7]
                      text-[#7aa2f7] font-semibold tracking-wide
                        transition-all duration-150
                      hover:bg-[#7aa2f7] hover:text-[#1a1b26]
                        hover:shadow-[0_0_12px_rgba(122,162,247,0.6)]
                        fade-in
                        cursor-pointer`
                        }
                    >
                        Projects
                    </button>

                    {/* Divider */}
                    <div className="h-6 w-px bg-[#2a2f47]" />

                    {/* Project buttons scroll */}
                    <div className="flex overflow-x-auto scroll-smooth pb-2 w-full space-x-2 scrollbar-x">
                        {projectCtx.projects.map(project => (
                            <button
                                key={project.id}
                                onClick={() => { if (projectCtx.activeProject.id !== project.id) projectCtx.selectProject(project.id) }}
                                className={
                                    projectCtx.activeProject.id === project.id ?
                                        `flex-shrink-0 px-4 py-1 rounded-sm
                                border border-[#9d7cd8]
                              bg-[#bb9af7] text-[#1f2335]
                                font-mono font-semibold tracking-wide
                                transition-all duration-200
                                cursor-default opacity-95
                                shadow-[0_0_14px_rgba(187,154,247,0.55)] slide-left`
                                        :
                                        `flex-shrink-0 px-4 py-1 rounded-sm
                                border border-[#2a2f47]
                              bg-[#16161e] text-[#c0caf5]
                                font-mono font-semibold tracking-wide
                                transition-all duration-150
                                cursor-pointer
                              hover:bg-[#1f2335]
                              hover:border-[#9d7cd8]
                              hover:text-[#bb9af7]
                                hover:shadow-[0_0_10px_rgba(157,124,216,0.35)]
                                slide-left`
                                }
                            >
                                {getShorter(project.title, 8)}
                            </button>
                        ))}

                    </div>
                </div>

            }
            {/* Mode switch (Tasks / Notes) */}
            {(currentState === MAIN_STATES.NOTES_DISPLAY || currentState === MAIN_STATES.TASK_DISPLAY) && <ProjectView currentState={currentState} onScreenChange={onScreenChange} />}
        </header>
    );
};


export default DefaultHeader;
