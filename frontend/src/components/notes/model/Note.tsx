import { useState } from "react";
import ActiveNote from "./ActiveNote";
import InactiveNote from "./InactiveNote";
import { NoteActivity } from "../../../utils/registries";
import { NoteData } from "../../../utils/types";
import EditableTitle from "../../shared/EditableTitle";

interface NoteProps {
    data: NoteData;
    isActive: boolean;
    focusTarget: "title" | "content" | null;
    onNoteFocus: (activity: NoteActivity) => void;
    onNoteDelete: (id: number) => void;
    onNoteSubmit: (id: number, content: string) => void;
    onTitleSubmit: (id: number, title: string) => void;
}

export const Note = ({
    data,
    isActive,
    focusTarget,
    onNoteFocus,
    onNoteDelete,
    onNoteSubmit,
    onTitleSubmit,
}: NoteProps) => {
    const [editingContent, setEditingContent] = useState(false);

    const activateNote = () => {
        onNoteFocus({ id: data.id, active: true });
    };

    const deactivateNote = () => {
        setEditingContent(false);
        onNoteFocus({ id: data.id, active: false });
    };

    return (
        <div
            className={`flex flex-col gap-3 p-4 rounded-md bg-[#1a1b26] border border-[#2a2f47] ${isActive ? "border-[#9d7cd8] shadow-[0_0_8px_#9d7cd8]" : ""}`}
        >
            <EditableTitle
                id={data.id}
                title={data.title}
                onSubmit={onTitleSubmit}
                autoFocus={focusTarget === "title"}
            />

            {isActive ? (
                <ActiveNote
                    data={data}
                    onNoteFocus={onNoteFocus}
                    onNoteDelete={onNoteDelete}
                    onSubmit={onNoteSubmit}
                    onInactive={deactivateNote}
                />
            ) : (
                <InactiveNote data={data} onActivate={activateNote} />
            )}
        </div>
    );
};

export default Note;