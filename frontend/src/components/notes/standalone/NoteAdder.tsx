import { Plus } from "lucide-react";
import { triggerScreenBob } from "../../../utils/screenShake";
import { NoteData } from "../../../utils/notes/noteTypes";
export interface NoteAdderProps{
    notes: NoteData[];
    onAddNote?: () => void;
}

export const NoteAdder = ({ notes, onAddNote }: NoteAdderProps) => {
    const addNote = ()=>{
        // check if any empty
        if (notes.some(n => n.title === '' || n.content === '')) return;
        onAddNote?.();
        triggerScreenBob();
    }
    return (
            <div className="flex justify-start mb-4">
                <button
                    onClick={addNote}
                    className="flex items-center gap-2 px-3 py-1 rounded-full border-2 border-green-500 bg-green-500 text-[#f6faff]
                 hover:bg-[#9ece6a] hover:shadow-[0_0_10px_#9ece6a] transition-all duration-150"
                >
                    <Plus size={18} strokeWidth={3} /> Add Note
                </button>
            </div>
);
}