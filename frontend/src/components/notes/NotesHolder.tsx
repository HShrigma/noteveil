import Note from './standalone/Note';
import Masonry from "react-masonry-css";
import { useNotes } from '../../utils/notes/useNote';
import { NoteAdder } from './standalone/NoteAdder';
import { getIndex } from '../../utils/notes/noteHelpers';
import { useNoteActivity } from '../../utils/notes/useNoteActivity';

export const NotesHolder = () => {
    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        500: 1,
    };

    const { notes, createNote, updateTitle, updateContent, removeNote } = useNotes();

    const { activeNote, isAdderDisabled, handleActivityRequest, setTitleSubmitActivity, setNoActivity, setAddNoteActivity, setNextActive} = useNoteActivity();

    const onTitleSubmit = async (id: number, title: string) => {
        const value = notes[getIndex(id, notes)].content;
        setTitleSubmitActivity(id, title);
        await updateTitle(id, title);
    };

    const onNoteRemove = async (id: number) => {
        setNoActivity();
        await removeNote(id);
    }
    const onNoteSubmit = async (id: number, content: string) => {
        setNoActivity();
        await updateContent(id, content);
    }
    const onAddNote = async () => {
        const id = await createNote();
        if (!id) return;
        setAddNoteActivity(id);
    }
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
                            onActivityUpdate={(activity) => handleActivityRequest(notes, activity)}
                            onFocusNext={(id) => setNextActive(notes, id)}
                        />
                    </div>
                ))}
            </Masonry>
        </div>
    );
}

export default NotesHolder;
