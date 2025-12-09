import Markdown from "react-markdown";
import { Edit } from "lucide-react";
import { NoteData } from "../../../utils/types";

interface InactiveNoteProps {
    data: NoteData;
    onActivate: () => void;
}

export const InactiveNote = ({ data, onActivate }: InactiveNoteProps) => {
    return (
        <div className="flex flex-col gap-1">
            <div onClick={onActivate} className="markdown-body">
                <Markdown>{data.content}</Markdown>
            </div>
            <button
                className="flex items-center gap-1 px-3 py-1 rounded-sm bg-purple-500 text-[#f6e0ff] hover:shadow-[0_0_8px_#9d7cd8] transition-all duration-150 w-max"
                onClick={onActivate}
            >
                <Edit size={16} strokeWidth={3} />
                Edit
            </button>
        </div>
    );
};

export default InactiveNote;