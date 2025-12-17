import { useEffect, useState } from "react";
import { Plus, Check, X } from "lucide-react";
import { triggerScreenBob, triggerScreenShake } from "../../../../utils/screenShake"
import ConfirmDeleteButton from "../../../shared/ConfirmDeleteButton";
import ErrorHint from "../../../shared/ErrorHint";

interface TaskBottomBarProps {
    isActive: boolean;
    onAdded: (label: string) => void;
    onDelete: () => void;
    onRequestActive: (wantsActive: boolean) => void;
}

export const TaskBottomBar = ({ isActive, onRequestActive, onAdded, onDelete }: TaskBottomBarProps) => {
    const [value, setValue] = useState("");
    const [triggerErrorCheck, setTriggerErrorCheck] = useState(false);

    useEffect(() => {
        if (isActive) triggerScreenBob(150);
    }, [isActive]);

    const discardInput = () => {
        triggerScreenShake(150);
        onRequestActive(false);
        setValue("");
    };

    const submitNewTask = () => {
        if (value.trim() === '') {
            triggerScreenShake(150);
            setTriggerErrorCheck(true);
            return;
        }
        onAdded?.(value);
        setValue("");
        onRequestActive(false);
        triggerScreenBob(200);

    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") submitNewTask();
        if (e.key === "Escape") discardInput();
    };

    return isActive ? (

        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mt-2">
                {/* Discard Button */}
                <button
                    onClick={discardInput}
                    className="p-2 rounded-full border-2 border-red-500 text-[#f7768e] hover:bg-red-500 hover:text-[#f6e0ff] transition-all duration-150"
                >
                    <X size={18} strokeWidth={3} />
                </button>

                {/* Input */}
                <input
                    value={value}
                    onChange={(e) => { setValue(e.target.value); setTriggerErrorCheck(false); }}
                    onKeyDown={handleKey}
                    autoFocus
                    placeholder="Add Task..."
                    className="flex-1 bg-transparent border-b-2 border-[#9d7cd8] text-[#c0caf5] font-mono font-semibold px-2 py-1 
                   focus:font-normal focus:font-firabase outline-none transition-all duration-150"
                />

                {/* Submit Button */}
                <button
                    onClick={submitNewTask}
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
                onClick={() => onRequestActive(true)}
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