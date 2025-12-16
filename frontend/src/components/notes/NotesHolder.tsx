import Note from './standalone/Note';
import Masonry from "react-masonry-css";
import { NoteAdder } from './standalone/NoteAdder';
import { useNotesManager } from '../../utils/notes/useNotesManager';

export const NotesHolder = () => {
    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        500: 1,
    };
    const {
        notes,
        activeNote,
        isAdderDisabled,
        onAddNote,
        onTitleSubmit,
        onNoteSubmit,
        onNoteRemove,
        onActivityUpdate,
        onFocusNext
    } = useNotesManager();

    return (
        <div className="mt-2">
            <NoteAdder notes={notes} onAddNote={onAddNote} disabled={isAdderDisabled()} />
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex gap-4"
                columnClassName="flex flex-col gap-4"
            >
                {notes.map((note, index) => (
                    <div key={index} className="break-inside-avoid mb-4 fade-in">
                        <Note
                            key={note.id}
                            data={note}
                            activity={activeNote}
                            onNoteDelete={onNoteRemove}
                            onTitleSubmit={onTitleSubmit}
                            onNoteSubmit={onNoteSubmit}
                            onActivityUpdate={onActivityUpdate}
                            onFocusNext={onFocusNext}
                        />
                    </div>
                ))}
            </Masonry>
        </div>
    );
}

export default NotesHolder;