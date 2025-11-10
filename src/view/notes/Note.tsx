import { useRef, useEffect } from "react";
import EditableTitle from "../shared/EditableTitle";
import Markdown from "react-markdown";
import type { NoteActivity } from "../utils/registries";

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

    useEffect(() => {
        if (focusTarget === 'content' && textareaRef.current && isActive) {
            textareaRef.current.focus();
            clearFocusTarget();
        }
    }, [focusTarget, isActive, clearFocusTarget]);

    const emitFocusSignal = (isActive: boolean) => {
        onNoteFocus?.({ index: id, active: isActive });
    };

    const signalActive = () => { emitFocusSignal(true); };
    const signalInactive = () => { emitFocusSignal(false); };

    const onKeyDownHandler = (input: React.KeyboardEvent) => {
        switch (input.key) {
            case "Enter":
                if (input.ctrlKey) signalInactive();
                break;
            case "Tab":
                input.preventDefault();
                if (input.shiftKey) {
                    onNoteFocus?.({ index: id - 1, active: true });
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
        <div>
            <EditableTitle
                id={id}
                title={title}
                onEdit={onTitleChange}
                onSubmit={onTitleSubmit}
                autoFocus={focusTarget === 'title'}
            />
            {isActive ?
                <div>
                    <textarea
                        ref={textareaRef}
                        name='noteBody'
                        placeholder={'Add note here...'}
                        value={content}
                        autoFocus={focusTarget === 'content'}
                        onChange={(e) => onContentChange?.(id, e.target.value)}
                        onKeyDown={onKeyDownHandler}
                    />
                    <button onClick={signalInactive}>Submit</button>
                </div>
                :
                <div onClick={signalActive}>
                    <Markdown>{content}</Markdown>
                    <button onClick={signalActive}>Edit</button>
                </div>
            }
            <button onClick={() => onNoteDelete?.(id)}>Delete</button>
        </div>
    );
}

export default Note;