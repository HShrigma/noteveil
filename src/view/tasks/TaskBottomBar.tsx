import { useEffect, useState } from "react";
import { Plus, Check, X } from "lucide-react";
import { triggerScreenBob, triggerScreenShake } from "../utils/screenShake";
import ConfirmDeleteButton from "../shared/ConfirmDeleteButton";
import ErrorHint from "../shared/ErrorHint";

interface TaskAdderProps {
  onAdded: (label: string) => void;
  onDelete: () => void;
}

export const TaskBottomBar = ({ onAdded: onTaskAdded, onDelete }: TaskAdderProps) => {
  const [txt, setTxt] = useState("");
  const [active, setActive] = useState(false);
  const [triggerErrorCheck, setTriggerErrorCheck] = useState(false);

  useEffect(() => {
    if (active) triggerScreenBob(150);
  }, [active]);
  const discardInput = () => {
    triggerScreenShake(150);
    setActive(false);
    setTxt("");
  };

  const submitNewTask = () => {
    if (txt.trim() === '') {
      triggerScreenShake(150);
      setTriggerErrorCheck(true);
      return;
    }
    onTaskAdded?.(txt);
    setTxt("");
    setActive(false);
    triggerScreenBob(200);

  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") submitNewTask();
    if (e.key === "Escape") discardInput();
  };

  return active ? (

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
          value={txt}
          onChange={(e) => { setTxt(e.target.value); setTriggerErrorCheck(false); }}
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
      <ErrorHint triggerCheck={triggerErrorCheck} toValidate={txt} message="Cannot submit empty title" />
    </div>
  ) : (

    <div className="flex justify-between mt-4 gap-2">
      <ConfirmDeleteButton
        onConfirm={onDelete}
        label="Delete"
      />
      <button
        onClick={() => setActive(true)}
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