import { useState } from "react";
import { Plus, Check, X } from "lucide-react";

interface TaskAdderProps {
  onTaskAdded: (label: string) => void;
}

export const TaskAdder = ({ onTaskAdded }: TaskAdderProps) => {
  const [txt, setTxt] = useState("");
  const [active, setActive] = useState(false);

  const discardInput = () => {
    setActive(false);
    setTxt("");
  };

  const submitNewTask = () => {
    if (txt.trim()) {
      onTaskAdded?.(txt);
      setTxt("");
      setActive(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") submitNewTask();
    if (e.key === "Escape") discardInput();
  };

  return active ? (
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
        onChange={(e) => setTxt(e.target.value)}
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
  ) : (
    <button
      onClick={() => setActive(true)}
      className="flex items-center gap-2 px-4 py-2 mt-2 rounded-sm border-2 border-green-500 bg-green-500 text-[#f6faff] 
                 hover:bg-[#9ece6a] hover:shadow-[0_0_10px_#9ece6a] transition-all duration-150"
    >
      <Plus size={18} strokeWidth={3} />
      Add Task
    </button>
  );
};

export default TaskAdder;

