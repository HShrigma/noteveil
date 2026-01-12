import ActiveNote from "../compositional/ActiveNote";
import InactiveNote from "../compositional/InactiveNote";
import { NoteData } from "../../../types/noteTypes";
import EditableTitle from "../../shared/title/EditableTitle";
import { useNoteManagerContext } from "../../../context/notes/noteManagerContext";

interface NoteProps {
    data: NoteData;
}

export const Note = ({
    data,
}: NoteProps) => {
    const ctx = useNoteManagerContext();

    return (
        <div
            className={`flex flex-col gap-3 p-4 rounded-md bg-[#1a1b26] border border-[#2a2f47] ${ctx.isBodyActive(data) ? "border-[#9d7cd8] shadow-[0_0_8px_#9d7cd8]" : ""}`}
        >
            <EditableTitle
                title={data.title}
                isActive={ctx.isTitleActive(data)}
                onActivityRequest={(wantsActive, value) => ctx.requestTitleActivity(wantsActive, value, data)}
                onSubmit={(value) => ctx.onTitleSubmit(data.id, value)}
            />

            {ctx.isBodyActive(data) ? (
                <ActiveNote
                    data={data}
                    onNoteDelete={() => ctx.onNoteRemove(data.id)}
                    onSubmit={ctx.onNoteSubmit}
                    onInactive={() => ctx.requestBodyActivity(false, data.content, data)}
                    onWantsActive={(value) => ctx.requestBodyActivity(true, value, data)}
                    onFocusNext={() => ctx.onFocusNext(data.id)}
                />
            ) : (
                <InactiveNote data={data} onActivate={() => ctx.requestBodyActivity(true, data.content, data)} />
            )}
        </div>
    );
};

export default Note;