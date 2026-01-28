import { SendHorizonal, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ErrorHint from "../../shared/ErrorHint";
import { triggerScreenBob, triggerScreenShake } from "../../../utils/screenShake";
import { discardMsgTask } from "../../../utils/registries";
import { tryCancelDiscard } from "../../../utils/activityHelper";

interface ActiveTaskProps {
    taskId: number;
    label: string;
    done: boolean;
    onSubmit: (id: number, label: string) => void;
    onChanged: (value: string) => void;
    onCancel: (value: string) => void;
}

export const ActiveTask = ({ taskId, label, done, onSubmit, onChanged, onCancel }: ActiveTaskProps) => {
    const [value, setValue] = useState(label);
    const [triggerErrorCheck, setTriggerErrorCheck] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
    }, []);

    const isEmpty = () => value.trim() === "";

    const handleSubmit = () => {
        setTriggerErrorCheck(isEmpty());
        if (isEmpty()) return;
        onSubmit(taskId, value.trim());
        triggerScreenBob(150);
    };

    const tryDiscard = () => {
        if(tryCancelDiscard(value !== label, discardMsgTask)) return;
        triggerScreenShake(150);
        onCancel(value);
        setValue(label);
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSubmit();
        if (e.key === "Escape") tryDiscard();
    };

    return (
        <div className="flex flex-col gap-1">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-md bg-[#1f2335] border border-[#2a2f47] shadow-sm`}>
                <button
                    className={`px-2 py-1 rounded-sm border-2 font-semibold transition-all duration-150 cursor-pointer
                    ${done ? "border-purple-500 bg-transparent text-[#f6faff] hover:bg-purple-500 hover:text-[#1a1b26]"
                            : "border-purple-500 bg-purple-500 text-[#f6faff] hover:bg-purple-400 "}`}
                    onClick={() => tryDiscard()}>
                    <X size={16} strokeWidth={4} />
                </button>
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => { setValue(e.target.value); setTriggerErrorCheck(false); onChanged(e.target.value); }}
                    onKeyDown={handleKey}
                    placeholder="Task..."
                    className={`flex-1 bg-transparent border-b-2 outline-none font-mono font-semibold px-1 text-base tracking-wide
            ${done ? "border-[#565f89] text-[#565f89]" : "border-[#9d7cd8] text-[#c0caf5]"}`}
                />
                <button
                    onClick={handleSubmit}
                    className={`px-2 py-1 rounded-sm border-2 font-semibold transition-all duration-150 cursor-pointer
            ${done ? "border-[#9ece6a] bg-transparent text-[#f6faff] hover:bg-[#9ece6a] hover:text-[#1a1b26]"
                            : "border-[#8fbf5a] bg-[#8fbf5a] text-[#f6faff] hover:bg-[#a6d372]"}`}
                >
                    <SendHorizonal size={16} strokeWidth={3} />
                </button>
            </div>
            <ErrorHint message="Cannot submit empty task" toValidate={value} triggerCheck={triggerErrorCheck} />
        </div>
    );
};

export default ActiveTask;