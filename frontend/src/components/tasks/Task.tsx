import { Check, RotateCw, SendHorizonal } from "lucide-react";
import { triggerScreenBob, triggerScreenShake } from "../../utils/screenShake";
import ConfirmDeleteButton from "../shared/ConfirmDeleteButton";
import ErrorHint from "../shared/ErrorHint";
import { useEffect, useRef, useState } from "react";

export interface TaskItem {
  id: number;
  label: string;
  done: boolean;
}

interface TaskProps {
  task: TaskItem;
  startEditing?: boolean; // true when a newly-created blank task should start editing
  onSubmit?: (id: number, label: string) => void;
  onDoneChange?: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
}

export const Task = ({ task, startEditing = false, onSubmit, onDoneChange, onDelete }: TaskProps) => {
  const [editing, setEditing] = useState<boolean>(startEditing || task.label === "");
  const [value, setValue] = useState<string>(task.label);
  const [triggerErrorCheck, setTriggerErrorCheck] = useState(false);

  // keep local value in sync when parent updates task.label (after save)
  useEffect(() => {
    setValue(task.label);
    if (!task.label) setEditing(true); // if backend sends empty label, stay editing
  }, [task.label]);

  const origRef = useRef(task.label);
  useEffect(() => { origRef.current = task.label; }, [task.label]);

  const isLabelEmpty = () => value.trim() === "";

  const submit = () => {
    setTriggerErrorCheck(isLabelEmpty());
    if (isLabelEmpty()) return;
    // optimistic UI handled by parent; here we inform parent of new value
    onSubmit?.(task.id, value);
    setEditing(false);
    triggerScreenBob(150);
  };

  const cancel = () => {
    setValue(origRef.current);
    setTriggerErrorCheck(false);
    setEditing(false);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancel();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setTriggerErrorCheck(false);
  };

  const handleDoneClick = () => {
    // If currently editing, submitting should happen (explicit behavior).
    if (editing) {
      submit();
      return;
    }

    triggerScreenBob(150);
    onDoneChange?.(task.id, !task.done);
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

        {/* Label: div when inactive, input when editing */}
        {!editing ? (
          <div
            onClick={() => setEditing(true)}
            className={`
              flex-1 px-1 cursor-pointer font-mono font-semibold text-base tracking-wide
              ${task.done ? "text-[#565f89] line-through" : "text-[#c0caf5]"}
            `}
          >
            {task.label || <span className="opacity-40 italic">Task...</span>}
          </div>
        ) : (
          <input
            placeholder="Task..."
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKey}
            // Note: per Option 3 we DO NOT auto-handle blur; user must submit/escape explicitly
            autoFocus
            className={`
              flex-1 bg-transparent border-b-2 outline-none font-mono font-semibold 
              text-base tracking-wide px-1 transition-all duration-150
              ${task.done ? "border-[#565f89] text-[#565f89] focus:font-normal" : "border-[#9d7cd8] text-[#c0caf5] focus:font-normal"}
            `}
          />
        )}

        {/* Status / Submit Button */}
        <button
          onClick={handleDoneClick}
          className={`px-2 py-1 rounded-sm border-2 font-semibold transition-all duration-150
            ${task.done ? "border-[#9ece6a] bg-transparent text-[#f6faff] hover:bg-[#9ece6a] hover:text-[#1a1b26]" : "border-[#8fbf5a] bg-[#8fbf5a] text-[#f6faff] hover:bg-[#a6d372]"}`}
        >
          {editing ? <SendHorizonal size={16} strokeWidth={3} /> : task.done ? <RotateCw size={16} strokeWidth={3} /> : <Check size={16} strokeWidth={4} />}
        </button>
      </div>

      <ErrorHint message={"Cannot submit empty task"} toValidate={value} triggerCheck={triggerErrorCheck} />
    </div>
  );
};

export default Task;

