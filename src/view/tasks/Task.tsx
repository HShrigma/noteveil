import { Check, RotateCw } from "lucide-react";
import { triggerScreenBob, triggerScreenShake } from "../utils/screenShake";
import ConfirmDeleteButton from "../shared/ConfirmDeleteButton";
import ErrorHint from "../shared/ErrorHint";
import { useState } from "react";

export interface TaskItem {
    id: number;
    label: string;
    done: boolean;
}

interface TaskProps {
    task: TaskItem;
    onLabelChange?: (id: number, label: string) => void;
    onDoneChange?: (id: number, done: boolean) => void;
    onDelete: (id: number) => void;
}

export const Task = ({ task, onLabelChange, onDoneChange, onDelete }: TaskProps) => {
    const [triggerErrorCheck, setTriggerErrorCheck] = useState(false);
    const handleDoneClick = () => {
        triggerScreenBob(150);
        onDoneChange?.(task.id, !task.done);
    };

    const submit = () =>{
        if(task.label.trim() === '') {
            setTriggerErrorCheck(true);
            console.log("empty");
        }
    }
    const handleKey = (event: React.KeyboardEvent) => {
        if(event.key = "Enter") submit();
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onLabelChange?.(task.id, event.target.value);
        setTriggerErrorCheck(false);
    };

    const handleDeleteClick = () => {
        triggerScreenShake();
        onDelete?.(task.id);
    };

    return (

    <div className="flex flex-col gap-1">
        <div
            className={`flex items-center gap-3 px-4 py-2 rounded-md bg-[#1f2335] border border-[#2a2f47] 
                  shadow-sm transition-all duration-150
                  ${task.done ? "opacity-70" : "opacity-100 hover:shadow-[0_0_8px_#9d7cd8]"}`}
        >
            {/* Delete Button */}
            <ConfirmDeleteButton 
                onConfirm={handleDeleteClick}
                confirmLabel="Confirm"
                className="p-1 rounded-sm border-2 border-red-500 text-[#f7768e] hover:bg-red-500 hover:text-[#f6e0ff] transition-all duration-150"
            />
            {/* Label Input */}
            <input
                placeholder="Task..."
                onChange={handleInputChange}
                onKeyDown={handleKey}
                value={task.label}
                className={`flex-1 bg-transparent border-b-2 outline-none font-mono font-semibold text-base tracking-wide px-1
                    transition-all duration-150
                    ${task.done
                        ? "border-[#565f89] text-[#565f89] line-through focus:font-normal focus:font-firabase"
                        : "border-[#9d7cd8] text-[#c0caf5] focus:font-normal focus:font-firabase"
                    }`}
            />

            {/* Status Button */}
            <button
                onClick={handleDoneClick}
                className={`px-2 py-1 rounded-sm border-2 font-semibold transition-all duration-150
    ${task.done
                        ? "border-[#9ece6a] bg-transparent text-[#f6faff] hover:bg-[#9ece6a] hover:text-[#1a1b26]"
                        : "border-[#8fbf5a] bg-[#8fbf5a] text-[#f6faff] hover:bg-[#a6d372]"}`}
            >
                {task.done ? <RotateCw size={16} strokeWidth={3}/> : <Check size={16} strokeWidth={4} />}
            </button>
 
    </div>
           <ErrorHint message={"Cannot submit empty task"} toValidate={task.label} triggerCheck={triggerErrorCheck} />
        </div>
    );
};

export default Task;
