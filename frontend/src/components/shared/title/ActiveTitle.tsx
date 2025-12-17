import { Check, X } from "lucide-react";
import ErrorHint from "../ErrorHint";
import { useEffect, useRef, useState } from "react";
import { triggerScreenBob, triggerScreenShake } from "../../../utils/screenShake";
import { discardMsgNoteTitle, discardMsgTaskTitle } from "../../../utils/registries";

export interface ActiveTitleProps {
    title: string;
    isNote?: boolean;
    onDiscard: () => void;
    onChange?: (currentValue: string) => void;
    onSubmit: (value: string) => void;
}

export const ActiveTitle = ({ title, isNote, onDiscard, onSubmit, onChange }: ActiveTitleProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState(title);
    const [triggerErrorCheck, setTriggerErrorCheck] = useState(false);

    useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
}, []);

    const handleSubmit = () => {
        if (value.trim() === '') {
            setTriggerErrorCheck(true);
            triggerScreenShake();
            return;
        }

        onSubmit?.(value.trim());
        triggerScreenBob(200);
    };
    const handleDiscard = () => {
        if (value.trim() !== title.trim() && !confirm(isNote ? discardMsgNoteTitle : discardMsgTaskTitle)) return;
        triggerScreenShake(110);
        setValue(title);
        onDiscard?.();
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSubmit();
        if (e.key === 'Escape') handleDiscard();
    };
    return (<div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
            <button
                onClick={handleDiscard}
                className="p-2 rounded-full bg-transparent border-2 border-red-500 text-[#f7768e] hover:bg-red-500 hover:text-[#f6e0ff] hover:shadow-[0_0_8px_#f7768e] transition-all duration-150"
            >
                <X size={18} strokeWidth={3} />
            </button>
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => { setValue(e.target.value); onChange?.(e.target.value); setTriggerErrorCheck(false); }}
                onKeyDown={handleKeyDown}
                placeholder="Enter Title..."
                className="flex-1 bg-transparent border-b-2 border-[#9d7cd8] font-mono font-semibold focus:font-normal text-[#c0caf5] px-2 py-1 transition-all duration-150"
            />
            <button
                onClick={handleSubmit}
                className="p-2 rounded-full bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-[#f6e0ff] hover:shadow-[0_0_8px_#9d7cd8] transition-all duration-150"
            >
                <Check size={18} strokeWidth={3} />
            </button>
        </div>
        <ErrorHint triggerCheck={triggerErrorCheck} toValidate={value} message="Cannot submit empty title" />
    </div>
    );
}

export default ActiveTitle;