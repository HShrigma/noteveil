import { useState, useEffect } from "react";
import { Plus, Check, X } from "lucide-react";
import { triggerScreenBob, triggerScreenShake } from "../../../../utils/screenShake";
import ErrorHint from "../../../shared/ErrorHint";

interface TaskListAdderProps {
    isActive: boolean;
    onRequestActive: (wantsActive: boolean) => void;
    onTaskListAdded?: (title: string) => void;
}

export const TaskListAdder = ({ isActive, onTaskListAdded, onRequestActive }: TaskListAdderProps) => {
    const [txt, setTxt] = useState("");
    const [triggerErrorCheck, setTriggerErrorCheck] = useState(false);

    useEffect(() => {
        if (isActive) triggerScreenBob(150);
    }, [isActive]);

    const discard = () => {
        triggerScreenShake(150);
        onRequestActive(false);
        setTxt("");
    };

    const submit = () => {
        if (txt.trim() === "") {
            triggerScreenShake(150);
            setTriggerErrorCheck(true);
            return;
        }

        onTaskListAdded?.(txt.trim());

        setTxt("");
        onRequestActive(false);
        triggerScreenBob(200);
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") submit();
        if (e.key === "Escape") discard();
    };

    return (
        <div className="mb-4">
            {isActive ? (
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 mt-2">
                        <button
                            onClick={discard}
                            className="p-2 rounded-full border-2 border-red-500 text-[#f7768e] 
                         hover:bg-red-500 hover:text-[#f6e0ff] transition-all duration-150"
                        >
                            <X size={18} strokeWidth={3} />
                        </button>

                        <input
                            value={txt}
                            onChange={(e) => {
                                setTxt(e.target.value);
                                setTriggerErrorCheck(false);
                            }}
                            onKeyDown={handleKey}
                            autoFocus
                            placeholder="New List Name..."
                            className="flex-1 bg-transparent border-b-2 border-[#9d7cd8] text-[#c0caf5] font-mono font-semibold px-2 py-1 
                         focus:font-normal outline-none transition-all duration-150"
                        />

                        <button
                            onClick={submit}
                            className="p-2 rounded-full border-2 border-green-500 text-[#f6faff] bg-transparent 
                         hover:bg-[#9ece6a] hover:shadow-[0_0_10px_#9ece6a] transition-all duration-150"
                        >
                            <Check size={18} strokeWidth={3} />
                        </button>
                    </div>

                    <ErrorHint
                        triggerCheck={triggerErrorCheck}
                        toValidate={txt}
                        message="List title cannot be empty"
                    />
                </div>
            ) : (
                <button
                    onClick={() => onRequestActive(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-sm border-2 border-purple-500 bg-purple-500 
                     text-[#f6faff] hover:bg-[#bb9af7] hover:shadow-[0_0_10px_#bb9af7] transition-all duration-150"
                >
                    <Plus size={18} strokeWidth={3} />
                    Add List
                </button>
            )}
        </div>
    );
};

export default TaskListAdder;
