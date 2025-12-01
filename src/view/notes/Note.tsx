import { useRef, useEffect, useState } from "react";
import EditableTitle from "../shared/EditableTitle";
import Markdown from "react-markdown";
import type { NoteActivity } from "../utils/registries";
import { Check, Edit} from "lucide-react";
import ConfirmDeleteButton from "../shared/ConfirmDeleteButton";
import { triggerScreenBob, triggerScreenShake } from "../utils/screenShake";
import ErrorHint from "../shared/ErrorHint";

interface NoteProps {
    id: number;
    title: string;
    content: string;
    isActive: boolean;
    focusTarget: 'title' | 'content' | null;
    onNoteFocus: (value: NoteActivity) => void;
    onNoteDelete: (index: number) => void;
    onContentChange: (id: number, content: string) => void;
    onTitleChange: (id: number, title: string) => void;
    onTitleSubmit: (id: number) => void;
    clearFocusTarget: () => void;
};

export const Note = ({
    id,
    title,
    content,
    isActive,
    focusTarget,
    onNoteFocus,
    onNoteDelete,
    onContentChange,
    onTitleChange,
    onTitleSubmit,
    clearFocusTarget
}: NoteProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [triggerErrorCheck, setTriggerErrorCheck] = useState(false);
    useEffect(() => {
        if (focusTarget === 'content' && textareaRef.current && isActive) {
            textareaRef.current.focus();
            clearFocusTarget();
        }
    }, [focusTarget, isActive, clearFocusTarget]);
    useEffect(() => {
        if (textareaRef.current) {
            const target = textareaRef.current;
            target.style.height = "auto";
            target.style.height = target.scrollHeight + "px";
        }
    }, [content, isActive]);

    const emitFocusSignal = (isActive: boolean) => {
        onNoteFocus?.({ index: id, active: isActive });
    };

    const signalActive = () => { emitFocusSignal(true); };
    const signalInactive = () => {
        if (content.trim() === '') {
            setTriggerErrorCheck(true);
            triggerScreenShake();
            return;
        }
        emitFocusSignal(false);
        triggerScreenBob(150);
    };

    const onKeyDownHandler = (input: React.KeyboardEvent) => {
        switch (input.key) {
            case "Enter":
                if (input.ctrlKey) signalInactive();
                break;
            case "Tab":
                input.preventDefault();
                if (input.shiftKey) {
                    onNoteFocus?.({ index: id + 1, active: true });
                }
                else {
                    const target = input.currentTarget as HTMLTextAreaElement;
                    const start = target.selectionStart;
                    const end = target.selectionEnd;

                    // Insert two spaces at cursor position
                    const newValue =
                        content.substring(0, start) + "  " + content.substring(end);

                    // Update the content
                    onContentChange?.(id, newValue);

                    // Move cursor after inserted spaces (handled in next tick)
                    requestAnimationFrame(() => {
                        target.selectionStart = target.selectionEnd = start + 2;
                    });
                }
                break;
            default:
                break;
        }
    };

    return (
        <div
            className={`flex flex-col gap-3 p-4 rounded-md bg-[#1a1b26] border border-[#2a2f47] 
    ${isActive ? 'border-[#9d7cd8] shadow-[0_0_8px_#9d7cd8]' : ''}`}
        >
            {/* Editable Title */}
            <EditableTitle
                id={id}
                title={title}
                onEdit={onTitleChange}
                onSubmit={onTitleSubmit}
                autoFocus={focusTarget === 'title'}
            />

            {/* Active Note */}
            {isActive ? (
                <div className="flex flex-col gap-2">
                    <textarea
                        ref={textareaRef}
                        name="noteBody"
                        placeholder="Add note here..."
                        value={content}
                        autoFocus={focusTarget === 'content'}
                        onChange={(e) => {onContentChange?.(id, e.target.value); setTriggerErrorCheck(false);}}
                        onInput={(e) => {
                            const target = e.currentTarget;
                            target.style.height = "auto"; // reset
                            target.style.height = target.scrollHeight + "px"; // adjust to scroll height
                        }}
                        onKeyDown={onKeyDownHandler}
                        className="bg-transparent border-b-2 border-[#9d7cd8] font-mono font-semibold focus:font-normal focus:font-firabase text-[#c0caf5] px-2 py-1 transition-all duration-150 resize-none overflow-hidden"
                    />
                    <ErrorHint triggerCheck={triggerErrorCheck} toValidate={content} message="Cannot submit an empty note" />
                    <div className="flex justify-between mt-2">
                        <ConfirmDeleteButton
                            onConfirm={() => onNoteDelete?.(id)}
                            label="delete"
                        />
                        <button
                            onClick={signalInactive}
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500 text-[#f6faff] hover:bg-[#9ece6a] hover:shadow-[0_0_10px_#9ece6a] transition-all duration-150"
                        >
                            <Check size={18} strokeWidth={3} />
                            Submit
                        </button>
                    </div>
                    {/* Keybinding hints */}
                    <div className="flex justify-between text-xs text-[#565f89] mt-1 px-2">
                        <span>Shift+Tab - Next note</span>
                        <span>Ctrl+Enter = submit</span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-1">
                    <div onClick={signalActive}
                        className=" markdown-body"
                    >
                        <Markdown>
                            {content}
                        </Markdown>
                    </div>
                    <button
                        className="flex items-center gap-1 px-3 py-1 rounded-sm bg-purple-500 text-[#f6e0ff] hover:shadow-[0_0_8px_#9d7cd8] transition-all duration-150 w-max"
                        onClick={signalActive}
                    >
                        <Edit size={16} strokeWidth={3} />
                        Edit
                    </button>
                </div>
            )}

        </div>

    );
}

export default Note;