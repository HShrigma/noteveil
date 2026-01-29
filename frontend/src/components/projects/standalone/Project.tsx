import type { ProjectData } from "../../../types/projectTypes";
import { discardMsgProjectTitle  } from "../../../utils/registries";
import ConfirmDeleteButton from "../../shared/ConfirmDeleteButton";
import EditableTitle from "../../shared/title/EditableTitle";
import { useProjectsContext } from "../../../context/projects/projectsContext";

export interface ProjectProps {
    project: ProjectData;
}

export const Project = ({ project  }: ProjectProps) => {

    const ctx = useProjectsContext();
    return (
        <div
            key={project.id}
            onClick={() => ctx.selectProject(project.id)}
            className={`
                group cursor-pointer
                rounded-md border-2 border-[#2a2f47]
                bg-[#1f2335] font-mono
                shadow-md shadow-black/30
                transition-all duration-200
                hover:bg-[#24283b]
                hover:shadow-[0_0_18px_rgba(122,162,247,0.25)]
                hover:-translate-y-1
                hover:scale-102
                active:translate-y-0`}>
            {/* Top row */}
            <div className=" flex flex-col items-start gap-3 py-3 px-2 min-w-0">
                <div className="w-full min-w-0" onClick={(e) => e.stopPropagation()}>
                    <EditableTitle
                        title={project.title}
                        isActive={ctx.isProjectTitleActive(project.id)}
                        discardMsg={discardMsgProjectTitle}
                        onActivityRequest={(wantsActive, value) => ctx.buildTitleActivityRequest(project.id, wantsActive, value)}
                        onSubmit={(newValue) => ctx.submitProjectTitle(project.id, newValue)} />
                </div>
                <div className="flex shrink-0 gap-2 text-sm flex-col min-[700px]:flex-row">
                    <span className="text-[#7aa2f7] whitespace-nowrap"> Tasks Lists:{project.taskListCount} </span>
                    <span className="text-[#bb9af7] whitespace-nowrap"> Notes:{project.noteCount} </span>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#2a2f47]" />

            {/* Actions */}
            <div className="flex items-center justify-between px-4 py-3">
                <div onClick={(e) => e.stopPropagation()}>
                    <ConfirmDeleteButton
                        label="Delete"
                        onConfirm={() => ctx.deleteProject(project.id)} />
                </div>

                <span className={`
                    text-xs font-semibold tracking-wide
                    rounded-md p-2
                    bg-purple-400 text-white
                    opacity-0 
                    group-hover:opacity-100
                    hover:shadow-[0_0_8px_4px_rgba(194,122,255,0.7)]
                    transition-all`}>
                    Open
                </span>
            </div>
        </div>

    );
}
export default Project;