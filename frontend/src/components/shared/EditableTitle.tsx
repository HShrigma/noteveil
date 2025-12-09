import { Check, Edit, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ErrorHint from "./ErrorHint";
import { triggerScreenShake, triggerScreenBob } from "../../utils/screenShake";

interface EditableTitleProps {
  id: number;
  title: string;
  onSubmit: (id: number, newValue: string) => void;
  autoFocus?: boolean;
}

export const EditableTitle = ({ id, title = '', onSubmit, autoFocus = false }: EditableTitleProps) => {
  const [active, setActive] = useState(title === '');
  const [value, setValue] = useState(title);
  const [triggerErrorCheck, setTriggerErrorCheck] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (active && inputRef.current && autoFocus) {
      inputRef.current.focus();
    }
  }, [active, autoFocus]);

  const handleSubmit = () => {
    if (value.trim() === '') {
      setTriggerErrorCheck(true);
      triggerScreenShake();
      return;
    }

    onSubmit?.(id, value.trim());
    setActive(false);
    triggerScreenBob(150);
  };

  const handleDiscard = () => {
    setValue(title); // revert
    setActive(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'Escape') handleDiscard();
  };

  return (
    <>
      {active ? (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
             <button
              onClick={handleDiscard}
              className="p-2 rounded-full bg-transparent border-2 border-red-500 text-[#f7768e] hover:bg-red-500 hover:text-[#f6e0ff] hover:shadow-[0_0_8px_#f7768e] transition-all duration-150"
            >
              <X size={18} strokeWidth={3} />
            </button>
           <input
              ref={inputRef}
              value={value}
              onChange={(e) => { setValue(e.target.value); setTriggerErrorCheck(false); }}
              onKeyDown={handleKeyDown}
              placeholder="Enter Title..."
              className="flex-1 bg-transparent border-b-2 border-[#9d7cd8] font-mono font-semibold focus:font-normal text-[#c0caf5] px-2 py-1 transition-all duration-150"
            />
            <button
              onClick={handleSubmit}
              className="p-2 rounded-full bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-[#f6e0ff] hover:shadow-[0_0_8px_#9d7cd8] transition-all duration-150"
            >
              <Check size={18} strokeWidth={3} />
            </button>
          </div>
          <ErrorHint triggerCheck={triggerErrorCheck} toValidate={value} message="Cannot submit empty title" />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <h3
            onClick={() => setActive(true)}
            className="flex-1 text-purple-400 font-bold tracking-wide cursor-pointer"
          >
            {title}
          </h3>
          <button
            className="p-2 rounded-sm bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-[#f6e0ff] hover:shadow-[0_0_8px_#9d7cd8] transition-all duration-150"
            onClick={() => setActive(true)}
          >
            <Edit size={18} strokeWidth={3} />
          </button>
        </div>
      )}
    </>
  );
};

export default EditableTitle;

