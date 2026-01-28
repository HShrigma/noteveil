import { Check, RotateCw } from "lucide-react";
import { triggerScreenBob, triggerScreenShake } from "../../../utils/screenShake";
import ConfirmDeleteButton from "../../shared/ConfirmDeleteButton";
import { getShorter } from "../../../utils/formatting";

interface InactiveTaskProps {
  taskId: number;
  label: string;
  done: boolean;
  onActivate: () => void;
  onDoneChange?: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
}

export const InactiveTask = ({ taskId, label, done, onActivate, onDoneChange, onDelete }: InactiveTaskProps) => {
  const handleDoneClick = () => {
    triggerScreenBob(150);
    onDoneChange?.(taskId, !done);
  };

  const handleDeleteClick = () => {
    triggerScreenShake();
    onDelete(taskId);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className={`flex items-center gap-3 px-4 py-2 rounded-md bg-[#1f2335] border border-[#2a2f47] shadow-sm`}>
        <ConfirmDeleteButton onConfirm={handleDeleteClick}/>
        <div
          className={`flex-1 px-1 cursor-pointer font-mono font-semibold text-base tracking-wide ${done ? "text-[#565f89] line-through" : "text-[#c0caf5]"}`}
          onClick={onActivate}
        >
          {getShorter(label,23) || <span className="opacity-40 italic">Task...</span>}
        </div>
        <button
          onClick={handleDoneClick}
          className={`px-2 py-1 rounded-sm border-2 font-semibold transition-all duration-150 cursor-pointer
            ${done ? "border-[#9ece6a] bg-transparent text-[#f6faff] hover:bg-[#9ece6a] hover:text-[#1a1b26]"
                   : "border-[#8fbf5a] bg-[#8fbf5a] text-[#f6faff] hover:bg-[#a6d372] "}`}
        >
          {done ? <RotateCw size={16} strokeWidth={3} /> : <Check size={16} strokeWidth={4} />}
        </button>
      </div>
    </div>
  );
};

export default InactiveTask;