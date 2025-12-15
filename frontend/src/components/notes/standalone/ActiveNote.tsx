import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import ConfirmDeleteButton from "../../shared/ConfirmDeleteButton";
import ErrorHint from "../../shared/ErrorHint";
import { triggerScreenBob, triggerScreenShake } from "../../../utils/screenShake";
import { NoteActivity } from "../../../utils/registries";
import { NoteData } from "../../../utils/notes/noteTypes";

interface ActiveNoteProps {
    data: NoteData;
    focusTarget: "title" | "content" | null;
    onNoteFocus: (activity: NoteActivity) => void;
    onNoteDelete: (id: number) => void;
    onSubmit: (id: number, content: string) => void;
    onInactive: () => void;
}

export const ActiveNote = ({ data, focusTarget, onNoteFocus, onNoteDelete, onSubmit, onInactive }: ActiveNoteProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = useState(data.content);
    const [triggerErrorCheck, setTriggerErrorCheck] = useState(false);

    useEffect(() => {
        if (textareaRef.current && focusTarget === "content") {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
            textareaRef.current.focus();
        }
    }, [focusTarget]);


    const revertToSnapshot = () => {
        setValue(data.content);
        setTriggerErrorCheck(false);
    };

    const signalInactive = () => {
        if (value.trim() === "") {
            setTriggerErrorCheck(true);
            triggerScreenShake();
            return;
        }
        onSubmit(data.id, value);
        onInactive();
        triggerScreenBob(150);
    };

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        switch (e.key) {
            case "Escape":
                revertToSnapshot();
                onInactive();
                return;
            case "Enter":
                if (e.ctrlKey) signalInactive();
                return;
            case "Tab":
                e.preventDefault();
                if (e.shiftKey) {
                    const leave = value.trim() === data.content.trim() || confirm("Discard changes to this note?");
                    if (!leave) return;
                    revertToSnapshot();
                    onNoteFocus?.({ id: data.id + 1, active: true });
                    return;
                }
                const t = e.currentTarget;
                const start = t.selectionStart;
                const end = t.selectionEnd;
                const newValue = value.substring(0, start) + "  " + value.substring(end);
                setValue(newValue);
                requestAnimationFrame(() => {
                    t.selectionStart = t.selectionEnd = start + 2;
                });
                return;
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <textarea
                ref={textareaRef}
                placeholder="Add note here..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onInput={(e) => {
                    const t = e.currentTarget;
                    t.style.height = "auto";
                    t.style.height = t.scrollHeight + "px";
                }}
                onKeyDown={onKeyDownHandler}
                className="bg-transparent border-b-2 border-[#9d7cd8] font-mono font-semibold
                   focus:font-normal text-[#c0caf5] px-2 py-1 transition-all duration-150 resize-none overflow-hidden"
            />

            <ErrorHint triggerCheck={triggerErrorCheck} toValidate={value} message="Cannot submit an empty note" />

            <div className="flex justify-between mt-2">
                <ConfirmDeleteButton onConfirm={() => onNoteDelete?.(data.id)} label="Delete" />
                <button
                    onClick={signalInactive}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500 text-[#f6faff] hover:bg-[#9ece6a] hover:shadow-[0_0_10px_#9ece6a] transition-all duration-150"
                >
                    <Check size={18} strokeWidth={3} />
                    Submit
                </button>
            </div>

            <div className="flex justify-between text-xs text-[#565f89] mt-1 px-2">
                <span>Shift+Tab – next note</span>
                <span>Ctrl+Enter – submit</span>
                <span>Esc – discard</span>
            </div>
        </div>
    );
};

export default ActiveNote;