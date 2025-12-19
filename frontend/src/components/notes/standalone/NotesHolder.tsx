import Note from './Note';
import Masonry from "react-masonry-css";
import { NoteAdder } from './compositional/NoteAdder';
import { useNoteManagerContext } from '../../../utils/notes/noteManagerContext';

export const NotesHolder = () => {
    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        500: 1,
    };
    const ctx = useNoteManagerContext();
    return (
        <div className="mt-2">
            <NoteAdder notes={ctx.notes} onAddNote={ctx.onAddNote} disabled={ctx.isAdderDisabled()} />
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex gap-4"
                columnClassName="flex flex-col gap-4"
            >
                {ctx.notes.map((note, index) => (
                    <div key={index} className="break-inside-avoid mb-4 fade-in">
                        <Note key={note.id} data={note} />
                    </div>
                ))}
            </Masonry>
        </div>
    );
}

export default NotesHolder;