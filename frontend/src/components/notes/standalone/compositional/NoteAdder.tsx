import { Plus } from "lucide-react";
import { triggerScreenBob } from "../../../../utils/screenShake";
import { NoteData } from "../../../../utils/notes/noteTypes";
import ErrorHint from "../../../shared/ErrorHint";
import { useState } from "react";
export interface NoteAdderProps {
    notes: NoteData[];
    disabled: boolean;
    onAddNote?: () => void;
}

export const NoteAdder = ({disabled, notes, onAddNote }: NoteAdderProps) => {
    const [showHint, setShowHint] = useState(false);
    const hasEmpty = () => {return notes.some(n => n.title === '' || n.content === '')}
    const addNote = () => {
        if (hasEmpty()) {
            setShowHint(true);
            return;
        }
        setShowHint(false);
        onAddNote?.();
        triggerScreenBob();
    }
    const passToValidate = () => (hasEmpty() ? "" : "valid");
    return (
        <div className="flex justify-start mb-4">
            <div className="fexl-col">

                <button
                    onClick={disabled ? () => { } : addNote}
                    className={disabled ? 
                        "flex items-center gap-2 px-3 py-1 rounded-full border-2 border-green-700 bg-green-800 text-gray-300 "
                        : 
                        "flex items-center gap-2 px-3 py-1 rounded-full border-2 border-green-500 bg-green-500 text-[#f6faff] hover:bg-[#9ece6a] hover:shadow-[0_0_10px_#9ece6a] transition-all duration-150"}
                >
                    <Plus size={18} strokeWidth={3} /> Add Note
                </button>
                <ErrorHint message={"Cannot add Note when another note is empty!"} toValidate={passToValidate()} triggerCheck={showHint} />
            </div>
        </div>
    );
}

export default NoteAdder;