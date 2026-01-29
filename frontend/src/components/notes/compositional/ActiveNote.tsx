import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import ConfirmDeleteButton from "../../shared/ConfirmDeleteButton";
import ErrorHint from "../../shared/ErrorHint";
import { triggerScreenBob, triggerScreenShake } from "../../../utils/screenShake";
import type { NoteData } from "../../../types/noteTypes";
import { discardMsgNoteContent } from "../../../utils/registries";
import { tryCancelDiscard } from "../../../utils/activityHelper";

interface ActiveNoteProps {
    data: NoteData;
    onNoteDelete: (id: number) => void;
    onSubmit: (id: number, content: string) => void;
    onInactive: () => void;
    onWantsActive: (value: string) => void;
    onFocusNext: () => void;
}

export const ActiveNote = ({ data, onNoteDelete, onSubmit, onInactive, onWantsActive, onFocusNext }: ActiveNoteProps) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = useState(data.content);
    const [triggerErrorCheck, setTriggerErrorCheck] = useState(false);

    useEffect(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
    }, []);

    const revertToSnapshot = () => {
        setValue(data.content);
        setTriggerErrorCheck(false);
    };
    const tryDiscard = () => {
        if(tryCancelDiscard(value.trim() !== data.content.trim(), discardMsgNoteContent)) return;
        revertToSnapshot();
        onInactive();
        triggerScreenShake(110);
    }
    const trySubmit = () => {
        if (value.trim() === "") {
            setTriggerErrorCheck(true);
            triggerScreenShake();
            return;
        }
        onSubmit(data.id, value);
        triggerScreenBob(150);
    };

    const resizeTextArea = (e:React.FormEvent<HTMLTextAreaElement>) => {
        const t = e.currentTarget;
        t.style.height = "auto";
        t.style.height = t.scrollHeight + "px";
    }


    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        switch (e.key) {
            case "Escape":
                tryDiscard();
                return;
            case "Enter":
                if (e.ctrlKey) trySubmit();
                return;
            case "Tab":
                e.preventDefault();
                if (e.shiftKey) {
                    tryDiscard();
                    onFocusNext();
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
                ref={inputRef}
                placeholder="Add note here..."
                value={value}
                onChange={(e) => {setValue(e.target.value); onWantsActive(e.target.value)}}
                onFocus={resizeTextArea}
                onInput={resizeTextArea}
                onKeyDown={onKeyDownHandler}
                className="bg-transparent border-2 border-[#9d7cd8] font-mono font-semibold focus:font-normal 
                   text-[#c0caf5] px-2 py-1 transition-all duration-150 resize-none overflow-hidden outline-none shadow-[0_0_4px_#9d7cd8] min-h-2"
            />

            <ErrorHint triggerCheck={triggerErrorCheck} toValidate={value} message="Cannot submit an empty note" />

            <div className="flex justify-between mt-2">
                <ConfirmDeleteButton onConfirm={() => {onNoteDelete?.(data.id); triggerScreenShake(250);}} label="Delete" />
                <button
                    onClick={trySubmit}
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