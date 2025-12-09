import { Check } from "lucide-react";
import ConfirmDeleteButton from "../../shared/ConfirmDeleteButton";
import ErrorHint from "../../shared/ErrorHint";

export interface ActiveNoteProps {
  id: number;
  content: string;
  focusTarget: 'content' | null;
  onContentChange: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  triggerErrorCheck: boolean;
  setTriggerErrorCheck: (value: boolean) => void;
}

const ActiveNote = ({
  id,
  content,
  focusTarget,
  onContentChange,
  onDelete,
  onSubmit,
  onKeyDown,
  triggerErrorCheck,
  setTriggerErrorCheck
}: ActiveNoteProps) => {
  return (
    <div className="flex flex-col gap-2">
      <textarea
        name="noteBody"
        placeholder="Add note here..."
        value={content}
        autoFocus={focusTarget === "content"}
        onChange={(e) => {
          onContentChange(id, e.target.value);
          setTriggerErrorCheck(false);
        }}
        onInput={(e) => {
          const t = e.currentTarget;
          t.style.height = "auto";
          t.style.height = t.scrollHeight + "px";
        }}
        onKeyDown={onKeyDown}
        className="bg-transparent border-b-2 border-[#9d7cd8] font-mono font-semibold
                   focus:font-normal focus:font-firabase text-[#c0caf5]
                   px-2 py-1 transition-all duration-150 resize-none overflow-hidden"
      />

      <ErrorHint
        triggerCheck={triggerErrorCheck}
        toValidate={content}
        message="Cannot submit an empty note"
      />

      <div className="flex justify-between mt-2">
        <ConfirmDeleteButton onConfirm={() => onDelete(id)} label="Delete" />
        <button
          onClick={onSubmit}
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500
                     text-[#f6faff] hover:bg-[#9ece6a]
                     hover:shadow-[0_0_10px_#9ece6a] transition-all duration-150"
        >
          <Check size={18} strokeWidth={3} />
          Submit
        </button>
      </div>

      <div className="flex justify-between text-xs text-[#565f89] mt-1 px-2">
        <span>Shift+Tab – next note</span>
        <span>Ctrl+Enter – submit</span>
        <span>Esc – discard</span>
      </div>
    </div>
  );
};

export default ActiveNote;
