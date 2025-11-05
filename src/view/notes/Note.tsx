import NoteBlock from "./NoteBlock";

interface NoteProps {
    title: string;
    content: string;
};

export const Note = ({ title, content }: NoteProps) => {
    
    return (
        <div>
            <h3>{title}</h3>
            <NoteBlock content={content}/>
        </div>
    );
}

export default Note;