import MarkdownContent from "./MarkdownContent";

interface NoteBlockProps {
    id: number;
    active: boolean;
    onContentChange: (index: number, newContent: string) => void;
    onActiveSwitch: (index: number, newValue: boolean) => void;
    onKeyDown: (index: number, value: React.KeyboardEvent) => void;
    content: string;
};
export const NoteBlock = ({ id, active, content, onContentChange, onActiveSwitch, onKeyDown }: NoteBlockProps) => {

    return (
        active ?
            <input
                name='noteBody'
                placeholder={'Add note here...'}
                defaultValue={content}
                autoFocus
                onBlur={() => onActiveSwitch?.(id, false)}
                onChange={(e) => onContentChange?.(id, e.target.value)}
                onKeyDown={(e) => onKeyDown?.(id, e)}
            />
            : <MarkdownContent 
                key={id}
                id={id}
                content={content}
                onActiveSwitch={onActiveSwitch}
            />
    );
}

export default NoteBlock;