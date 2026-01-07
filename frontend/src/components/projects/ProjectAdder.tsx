import { useEffect, useState } from "react";
import ErrorHint from "../shared/ErrorHint";
import { Check, Plus, X } from "lucide-react";
import { triggerScreenBob, triggerScreenShake } from "../../utils/screenShake";
import { tryCancelDiscard } from "../../utils/activityHelper";
import { discardMsgProjectAdder } from "../../utils/registries";

export interface ProjectAdderProps {
    isActive: boolean;
    onProjectAdded?: (value: string) => void;
    onActivityRequest: (wantsActive: boolean, value: string) => void;
}
export const ProjectAdder = ({ isActive, onProjectAdded , onActivityRequest}: ProjectAdderProps) => {
    const [value, setValue] = useState("");
    const [triggerErrorCheck, setTriggerErrorCheck] = useState(false);

    const clearActivity = () => { onActivityRequest(false, "") };
    const activateAdder = (value = "") => { onActivityRequest(true, value) };

    useEffect(() => {
        if (isActive) triggerScreenBob(150);
        else setValue("");
    }, [isActive]);

    const tryDiscard = () => {
        if (tryCancelDiscard(value.trim() !== "", discardMsgProjectAdder)) return;
        triggerScreenShake(150);
        setValue("");
        clearActivity();
    };

    const submit = () => {
        if (value.trim() === "") {
            triggerScreenShake(150);
            setTriggerErrorCheck(true);
            return;
        }

        onProjectAdded?.(value.trim());
        clearActivity();

        setValue("");
        triggerScreenBob(200);
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") submit();
        if (e.key === "Escape") tryDiscard();
    };

    return (
        <div className="mb-4">
            {isActive ? (
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 mt-2">
                        <button
                            onClick={tryDiscard}
                            className="p-2 rounded-full border-2 border-red-500 text-[#f7768e] 
                         hover:bg-red-500 hover:text-[#f6e0ff] transition-all duration-150"
                        >
                            <X size={18} strokeWidth={3} />
                        </button>

                        <input
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                setTriggerErrorCheck(false);
                                activateAdder(e.target.value);
                            }}
                            onKeyDown={handleKey}
                            autoFocus
                            placeholder="New Project Name..."
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
                        toValidate={value}
                        message="List title cannot be empty"
                    />
                </div>
            ) : (
                <button
                    onClick={() => activateAdder()}
                    className="flex items-center gap-2 px-4 py-2 rounded-sm border-2 border-purple-500 bg-purple-500 
                     text-[#f6faff] hover:bg-[#bb9af7] hover:shadow-[0_0_10px_#bb9af7] transition-all duration-150"
                >
                    <Plus size={18} strokeWidth={3} />
                    Add Project
                </button>
            )}
        </div>
    );
};

export default ProjectAdder;