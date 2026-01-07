import { ProjectData } from "../../utils/registries";
import ConfirmDeleteButton from "../shared/ConfirmDeleteButton";

export interface ProjectProps {
    project: ProjectData;
    onProjectChange: (id: number) => void;
    onProjectDelete: (id: number) => void;
}

export const Project = ({ project, onProjectChange, onProjectDelete }: ProjectProps) => {
    return (
        <div
            key={project.id}
            onClick={() => onProjectChange(project.id)}
            className={`
                group cursor-pointer
                rounded-md border-2 border-[#2a2f47]
                bg-[#1f2335] font-mono
                shadow-md shadow-black/30
                transition-all duration-200
                hover:bg-[#24283b]
                hover:shadow-[0_0_18px_rgba(122,162,247,0.25)]
                hover:-translate-y-1
                active:translate-y-0`}>
            {/* Top row */}
            <div className="flex items-center justify-between px-5 py-4">
                <h2 className="text-lg font-bold tracking-wide text-[#c0caf5]">
                    {project.title}
                </h2>

                <div className="flex gap-3 text-sm">
                    <span className="text-[#7aa2f7]">
                        Tasks:{project.taskCount}
                    </span>
                    <span className="text-[#bb9af7]">
                        Notes:{project.noteCount}
                    </span>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#2a2f47]" />

            {/* Actions */}
            <div className="flex items-center justify-between px-4 py-3">
                <div onClick={(e) => e.stopPropagation()}>
                    <ConfirmDeleteButton
                        label="Delete"
                        onConfirm={() => onProjectDelete(project.id)}/>
                </div>

                <span className={`
                    text-xs font-semibold tracking-wide
                    rounded-md p-2
                    bg-[#bb9af7] text-[#fff]
                    opacity-0 group-hover:opacity-100
                    transition-opacity`}>
                    Open
                </span>
            </div>
        </div>

    );
}
export default Project;