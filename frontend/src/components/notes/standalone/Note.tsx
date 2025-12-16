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
    onFocusNext: (id:number) => void;
}

export const Note = ({
    data,
    activity, 
    onNoteDelete,
    onNoteSubmit,
    onTitleSubmit,
    onActivityUpdate,
    onFocusNext
}: NoteProps) => {
    const isActive = (typeLabel: string) => {
        if (activity === null) return false;
        return activity && (activity.type === typeLabel && activity.id === data.id)
    }
    const isBodyActive = () => { return  isActive("content")};
    const isTitleActive = () => { return isActive("title")};
    const requestBodyActivity = (wantsActive: boolean, value: string) => onActivityUpdate(wantsActive ? { id: data.id, type: "content", value: value } : null); 
    const requestTitleActivity = (wantsActive: boolean, value: string) => onActivityUpdate(wantsActive ? { id: data.id, type: "title", value: value } : null);
    
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
                    onInactive={() => requestBodyActivity(false, data.content)}
                    onWantsActive={(value) => requestBodyActivity(true, value)}
                    onFocusNext={() => onFocusNext(data.id)}
                />
            ) : (
                <InactiveNote data={data} onActivate={() => requestBodyActivity(true,data.content)} />
            )}
        </div>
    );
};

export default Note;