import { useRef, useEffect, useState } from "react";
import EditableTitle from "../../shared/EditableTitle";
import type { NoteActivity } from "../../../utils/registries";
import { triggerScreenBob, triggerScreenShake } from "../../../utils/screenShake";
import ActiveNote from "./ActiveNote";
import InactiveNote from "./InactiveNote";
import { NoteData } from "../../../utils/types";


interface NoteProps {
    data: NoteData;
    isActive: boolean;
    focusTarget: 'title' | 'content' | null;
    onNoteFocus: (value: NoteActivity) => void;
    onNoteDelete: (index: number) => void;
    onContentChange: (id: number, content: string) => void;
    onTitleSubmit: (id: number, title: string) => void;
    clearFocusTarget: () => void;
}

const Note = ({
    data,
    isActive,
    focusTarget,
    onNoteFocus,
    onNoteDelete,
    onContentChange,
    onTitleSubmit,
    clearFocusTarget
}: NoteProps) => {
    const [triggerErrorCheck, setTriggerErrorCheck] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [initialState, setInitialState] = useState({ title: data.title, content: data.content });

    useEffect(() => {
        if (isActive) setInitialState({ title: data.title, content: data.content });
    }, [isActive]);

    const hasUnsavedChanges =
        initialState.title !== data.title || initialState.content !== data.content;

    const signalActive = () => {
        onNoteFocus?.({ id: data.id, active: true });
    };

    const revertToSnapshot = () => {
        onTitleSubmit?.(data.id, initialState.title);
        onContentChange?.(data.id, initialState.content);
    };

    const signalInactive = () => {
        if (data.content.trim() === "") {
            setTriggerErrorCheck(true);
            triggerScreenShake();
            return;
        }
        onNoteFocus?.({ id: data.id, active: false });
        triggerScreenBob(150);
    };

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        switch (e.key) {
            case "Escape":
                revertToSnapshot();
                signalInactive();
                return;
            case "Enter":
                if (e.ctrlKey) signalInactive();
                return;
            case "Tab":
                e.preventDefault();
                if (e.shiftKey) {
                    if (hasUnsavedChanges) {
                        const leave = confirm("Discard changes to this note?");
                        if (!leave) return;
                        revertToSnapshot();
                    }
                    onNoteFocus?.({ id: data.id + 1, active: true });
                    return;
                }
                const t = e.currentTarget;
                const start = t.selectionStart;
                const end = t.selectionEnd;
                const newValue = data.content.substring(0, start) + "  " + data.content.substring(end);
                onContentChange?.(data.id, newValue);
                requestAnimationFrame(() => {
                    t.selectionStart = t.selectionEnd = start + 2;
                });
                return;
        }
    };

    return (
        <div className={`flex flex-col gap-3 p-4 rounded-md bg-[#1a1b26] border border-[#2a2f47] 
      ${isActive ? "border-[#9d7cd8] shadow-[0_0_8px_#9d7cd8]" : ""}`}>
            <EditableTitle
                id={data.id}
                title={data.title}
                onSubmit={onTitleSubmit}
                autoFocus={focusTarget === "title"}
            />
            {isActive ? (
                <ActiveNote
                    id={data.id}
                    content={data.content}
                    focusTarget={focusTarget === 'content' ? 'content' : null}
                    onContentChange={onContentChange}
                    onDelete={onNoteDelete}
                    onSubmit={signalInactive}
                    onKeyDown={onKeyDownHandler}
                    triggerErrorCheck={triggerErrorCheck}
                    setTriggerErrorCheck={setTriggerErrorCheck}
                />
            ) : (
                <InactiveNote content={data.content} onActivate={signalActive} />
            )}
        </div>
    );
};

export default Note;
