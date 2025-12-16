import ActiveNote from "./ActiveNote";
import InactiveNote from "./InactiveNote";
import { NotesActivity, NoteData } from "../../../utils/notes/noteTypes";
import EditableTitle from "../../shared/title/EditableTitle";

interface NoteProps {
    data: NoteData;
    activity: NotesActivity;
    onActivityUpdate: (activity: NotesActivity) => void;
    onNoteDelete: (id: number) => void;
    onNoteSubmit: (id: number, content: string) => void;
    onTitleSubmit: (id: number, title: string) => void;
}

export const Note = ({
    data,
    activity, 
    onNoteDelete,
    onNoteSubmit,
    onTitleSubmit,
    onActivityUpdate
}: NoteProps) => {
    const isActive = (typeLabel: string) => {
        if (activity === null) return false;
        return activity && (activity.type === typeLabel && activity.id === data.id)
    }
    const isBodyActive = () => { return  isActive("content")};
    const isTitleActive = () => { return isActive("title")};
    const requestBodyActivity = (status: boolean) => onActivityUpdate({ id: data.id, type: "content" });
    const requestTitleActivity = (status: boolean) => onActivityUpdate({id: data.id, type: "title"});

    return (
        <div
            className={`flex flex-col gap-3 p-4 rounded-md bg-[#1a1b26] border border-[#2a2f47] ${isBodyActive() ? "border-[#9d7cd8] shadow-[0_0_8px_#9d7cd8]" : ""}`}
        >
            <EditableTitle
                title={data.title}
                isActive={isTitleActive()}
                onActivityRequest={requestTitleActivity}
                onSubmit={(value) => onTitleSubmit(data.id,value)}
            />

            {isBodyActive() ? (
                <ActiveNote
                    data={data}
                    onNoteDelete={onNoteDelete}
                    onSubmit={onNoteSubmit}
                    onInactive={() => requestBodyActivity(false)}
                />
            ) : (
                <InactiveNote data={data} onActivate={() => requestBodyActivity(true)} />
            )}
        </div>
    );
};

export default Note;