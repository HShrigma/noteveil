import { useEffect, useState } from "react";
import { Plus, Check, X } from "lucide-react";
import { triggerScreenBob, triggerScreenShake } from "../../../utils/screenShake";
import { tryCancelDiscard } from "../../../utils/activityHelper";
import { discardMsgTaskBottomBar } from "../../../utils/registries";
import ConfirmDeleteButton from "../../shared/ConfirmDeleteButton";
import ErrorHint from "../../shared/ErrorHint";

interface TaskBottomBarProps {
    isActive: boolean;
    onAdded: (label: string) => void;
    onDelete: () => void;
    onActivityRequest: (wantsActive: boolean, value?: string) => void;
}

export const TaskBottomBar = ({ isActive, onActivityRequest, onAdded, onDelete }: TaskBottomBarProps) => {
    const [value, setValue] = useState("");
    const [triggerErrorCheck, setTriggerErrorCheck] = useState(false);

    useEffect(() => { 
        if (isActive) triggerScreenBob(150); 
        else setValue("");
    }, [isActive]);

    const tryDiscard = () => {
        if (tryCancelDiscard(value.trim() !== "", discardMsgTaskBottomBar)) return;
        triggerScreenShake(150);
        onActivityRequest(false, value);
        setValue("");
    };

    const trySubmit = () => {
        if (value.trim() === '') {
            triggerScreenShake(150);
            setTriggerErrorCheck(true);
            return;
        }
        onAdded?.(value);
        setValue("");
        onActivityRequest(false, value);
        triggerScreenBob(200);

    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") trySubmit();
        if (e.key === "Escape") tryDiscard();
    };

    return isActive ? (

        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mt-2">
                {/* Discard Button */}
                <button
                    onClick={tryDiscard}
                    className="p-2 rounded-full border-2 border-red-500 text-[#f7768e] hover:bg-red-500 hover:text-[#f6e0ff] transition-all duration-150"
                >
                    <X size={18} strokeWidth={3} />
                </button>

                {/* Input */}
                <input
                    value={value}
                    onChange={(e) => { setValue(e.target.value); setTriggerErrorCheck(false); onActivityRequest(true, e.target.value) }}
                    onKeyDown={handleKey}
                    autoFocus
                    placeholder="Add Task..."
                    className="flex-1 bg-transparent border-b-2 border-[#9d7cd8] text-[#c0caf5] font-mono font-semibold px-2 py-1 
                   focus:font-normal focus:font-firabase outline-none transition-all duration-150"
                />

                {/* Submit Button */}
                <button
                    onClick={trySubmit}
                    className="p-2 rounded-full border-2 border-green-500 bg-transparent text-[#f6faff] hover:bg-[#9ece6a] hover:shadow-[0_0_10px_#9ece6a] transition-all duration-150"
                >
                    <Check size={18} strokeWidth={3} />
                </button>
            </div>
            <ErrorHint triggerCheck={triggerErrorCheck} toValidate={value} message="Cannot submit empty title" />
        </div>
    ) : (

        <div className="flex justify-between mt-4 gap-2">
            <ConfirmDeleteButton
                onConfirm={onDelete}
                label="Delete"
            />
            <button
                    onClick={() => onActivityRequest(true)}
                className="flex items-center gap-2 px-4 py-2 mt-2 rounded-sm border-2 border-green-500 bg-green-500 text-[#f6faff] 
                 hover:bg-[#9ece6a] hover:shadow-[0_0_10px_#9ece6a] transition-all duration-150"
            >
                <Plus size={18} strokeWidth={3} />
                Add Task
            </button>
        </div>

    );
};

export default TaskBottomBar;