import NoteBlock from "./NoteBlock";

interface NoteProps {
    title: string;
    content: string;
};

export const Note = ({ title, content }: NoteProps) => {
    let blocks = content.split('\n');
    return (
        <div>
            <h3>{title}</h3>
            {blocks.map(block => <NoteBlock content={block}/>)}
        </div>
    );
}

export default Note;