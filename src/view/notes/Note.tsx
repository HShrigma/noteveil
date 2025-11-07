import Markdown from "react-markdown";

interface NoteProps {
    id: number;
    title: string;
    content: string;
    isActive: boolean;
    onNoteFocus: (id: number, value: boolean) => void;
    onContentChange: (id: number, content: string) => void;
};

export const Note = ({ id,title, content, isActive, onNoteFocus,onContentChange }: NoteProps) => {

       return (
        <div>
            <h3>{title}</h3>
        {     isActive ?
            <textarea
                name='noteBody'
                placeholder={'Add note here...'}
                value={content}
                autoFocus
                onChange={(e) => onContentChange?.(id, e.target.value)}
            />
            : 
            <div onClick={() => onNoteFocus?.(id, true)}>
                <Markdown>{content}</Markdown>
            </div>

        }
        </div>
    );
}

export default Note;