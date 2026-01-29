import Markdown from "react-markdown";
import { Edit } from "lucide-react";
import type { NoteData } from "../../../types/noteTypes";

interface InactiveNoteProps {
    data: NoteData;
    onActivate: () => void;
}

export const InactiveNote = ({ data, onActivate }: InactiveNoteProps) => {
    return (
        <div className="flex flex-col gap-1">
            <div onClick={onActivate} className={` min-h-8 ${data.content ? "markdown-body" : "text-gray-500 italic opacity-70"}`}>
                {data.content ? <Markdown>{data.content}</Markdown> : "Add note here..."}
            </div>
            <button
                className="flex items-center gap-1 px-3 py-1 rounded-sm bg-purple-500 text-[#f6e0ff] hover:shadow-[0_0_8px_#9d7cd8] transition-all duration-150 w-max cursor-pointer "
                onClick={onActivate}
            >
                <Edit size={16} strokeWidth={3} />
                Edit
            </button>
        </div>
    );
};

export default InactiveNote;